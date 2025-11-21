using Backend.Data;
using Backend.Models;
using Backend.Services;
using Backend.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace Backend.Controllers.Authentication
{
    [ApiController] 
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDBProvider _db;
        private readonly TokenService _tokenService;
        private readonly GoogleAuthService _googleAuthService;

        public class Req_Login
        {
            public string token { get; set; } = string.Empty;
        }

        public AuthController(AppDBProvider db, TokenService tokenService, GoogleAuthService googleAuthService)
        {
            _db = db;
            _tokenService = tokenService;
            _googleAuthService = googleAuthService;
        }


        private void SetAuthCookies(string accessToken, string refreshToken)
        {
            Response.Cookies.Append(AuthConstants.KEY_ACCESS_TOKEN, accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(10),
                MaxAge = TimeSpan.FromMinutes(10)
            });

            Response.Cookies.Append(AuthConstants.KEY_REFRESH_TOKEN, refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(30),
                MaxAge = TimeSpan.FromMinutes(10)
            });
        }

        private void DeleteAuthCookies()
        {
            Response.Cookies.Delete(AuthConstants.KEY_ACCESS_TOKEN);
            Response.Cookies.Delete(AuthConstants.KEY_REFRESH_TOKEN);
        }

        private async Task InvalidateRefreshToken(string token)
        {
            var dbToken = await _db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token == token);
            if (dbToken != null)
            {
                dbToken.RevokedAt = DateTime.UtcNow;
                await _db.SaveChangesAsync();
            }
        }

        /// <summary>
        /// Frontend sendet Google ID Token → Backend validiert → erstellt eigenen Access + Refresh Token
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Req_Login idToken)
        {
            if (string.IsNullOrEmpty(idToken.token)) { return BadRequest("[ERROR] id token is required."); }

            var payload = await _googleAuthService.ValidateAsync(idToken.token);

            if (payload == null) { return Unauthorized("[ERROR] id token is invalid"); }

            var user = await _db.Users.Include(user => user.RefreshTokens).FirstOrDefaultAsync(user => user.ID == payload.Subject);

            if (user == null)
            {
                user = new M_User
                {
                    ID = payload.Subject,
                    Email = payload.Email,
                    Name = payload.Name,
                    PictureUrl = payload.Picture,
                };

                _db.Users.Add(user);
            }

            string accessToken = _tokenService.CreateAccessToken(user);
            M_RefreshToken refreshToken = _tokenService.CreateRefreshToken(user.ID);

            user.RefreshTokens.Add(refreshToken);
            await _db.SaveChangesAsync();
            SetAuthCookies(accessToken, refreshToken.Token);

            return Ok(
                new
                {
                    message = "Erfolgreich eingeloggt",
                    user = new {user.ID, user.Email, image = user.PictureUrl, userName = user.Name},
                    tokens = new {accessToken, refreshToken = refreshToken.Token},
                }    
            );
        }

        /// <summary>
        /// Erstellt neue Tokens auf Basis eines gültigen Refresh Tokens
        /// </summary>
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            string? refreshTokenCookie = Request.Cookies[AuthConstants.KEY_REFRESH_TOKEN];

            if (string.IsNullOrEmpty(refreshTokenCookie)) { return Unauthorized("[ERROR] No refresh token found."); }

            M_RefreshToken? storedToken = await _db.RefreshTokens.Include(rt => rt.User).FirstOrDefaultAsync(rt => rt.Token  == refreshTokenCookie);

            if (storedToken == null || storedToken.ExpiresAt < DateTime.UtcNow) { return Unauthorized("[ERROR] Refresh token invalid or expired."); }

            // delete old refresh token
            storedToken.RevokedAt = DateTime.UtcNow;

            // create new tokens
            var newAccessToken = _tokenService.CreateAccessToken(storedToken.User);
            var newRefreshToken = _tokenService.CreateRefreshToken(storedToken.UserAccountID);

            newRefreshToken.ParentId = storedToken.Id;
            _db.RefreshTokens.Add(newRefreshToken);
            // Optional: alten Refresh-Token komplett löschen statt nur revoked markieren:
            // _db.RefreshTokens.Remove(storedToken);

            await _db.SaveChangesAsync();
            SetAuthCookies(newAccessToken, newRefreshToken.Token);

            return Ok(new 
            {
                message = "Tokens refreshed successfully.", token = new 
                { 
                refreshToken = newRefreshToken.Token,
                accessToken = newAccessToken
                } 
            });
        }


        /// <summary>
        /// Beendet die Session und widerruft den Refresh Token
        /// </summary>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            string? refreshTokenCookie = Request.Cookies[AuthConstants.KEY_REFRESH_TOKEN];

            if (!string.IsNullOrEmpty(refreshTokenCookie))
            {
                M_RefreshToken? storedToken = await _db.RefreshTokens.FirstOrDefaultAsync(rt => rt.Token.Equals(refreshTokenCookie));

                if (storedToken != null)
                {
                    storedToken.RevokedAt = DateTime.UtcNow;
                    await _db.SaveChangesAsync();
                }
            }

            DeleteAuthCookies();
            return Ok(new { message = "Logout user successfully." });
        }


        /// <summary>
        /// 
        /// </summary>
        [HttpGet("check")]
        public async Task<IActionResult> CheckAuthStatus()
        {
            // -----------------------------
            // 0. Header lesen
            // -----------------------------
            string accessToken = Request.Headers["access_token"].FirstOrDefault();
            string refreshToken = Request.Headers["refresh_token"].FirstOrDefault();
            string userId = Request.Headers["user_id"].FirstOrDefault();

            if (string.IsNullOrWhiteSpace(accessToken) ||
                string.IsNullOrWhiteSpace(refreshToken) ||
                string.IsNullOrWhiteSpace(userId))
            {
                return Unauthorized(new { success = false, error = "Missing headers." });
            }


            // -----------------------------
            // 1. Access Token – check expiration
            // -----------------------------
            var handler = new JwtSecurityTokenHandler();

            JwtSecurityToken jwt;
            try
            {
                jwt = handler.ReadJwtToken(accessToken);
            }
            catch
            {
                await InvalidateRefreshToken(refreshToken);
                return Unauthorized(new { success = false, error = "Invalid access token." });
            }

            var expClaim = jwt.Claims.FirstOrDefault(c => c.Type == "exp")?.Value;
            if (expClaim == null || !long.TryParse(expClaim, out var expSeconds))
            {
                await InvalidateRefreshToken(refreshToken);
                return Unauthorized(new { success = false, error = "Access token missing exp." });
            }

            DateTime tokenExpiry = DateTimeOffset.FromUnixTimeSeconds(expSeconds).UtcDateTime;

            if (tokenExpiry <= DateTime.UtcNow)
            {
                await InvalidateRefreshToken(refreshToken);
                return Unauthorized(new { success = false, error = "Access token expired." });
            }


            // -----------------------------
            // 2. Refresh Token – check expiration
            // -----------------------------
            var dbToken = await _db.RefreshTokens.FirstOrDefaultAsync(rt =>
                rt.Token == refreshToken && rt.UserAccountID == userId);

            if (dbToken == null)
            {
                return Unauthorized(new { success = false, error = "Refresh token not found." });
            }

            if (dbToken.RevokedAt != default)
            {
                return Unauthorized(new { success = false, error = "Refresh token revoked." });
            }

            if (dbToken.ExpiresAt <= DateTime.UtcNow)
            {
                await InvalidateRefreshToken(refreshToken);
                return Unauthorized(new { success = false, error = "Refresh token expired." });
            }


            // -----------------------------
            // 3. check user in db
            // -----------------------------
            var user = await _db.Users.FirstOrDefaultAsync(u => u.ID == userId);
            if (user == null)
            {
                await InvalidateRefreshToken(refreshToken);
                return Unauthorized(new { success = false, error = "User not found." });
            }


            // -----------------------------
            // 4. Tokens erneuern
            // -----------------------------
            string newAccessToken = _tokenService.CreateAccessToken(user);
            var newRefreshToken = _tokenService.CreateRefreshToken(user.ID);

            _db.RefreshTokens.Add(newRefreshToken);

            // optional: alten refresh token invalidieren
            dbToken.RevokedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();


            return Ok(new
            {
                success = true,
                user = new { user.ID, user.Email, image = user.PictureUrl, userName = user.Name },
                tokens = new
                {
                    accessToken = newAccessToken,
                    refreshToken = newRefreshToken.Token
                }
            });
        }


        



        /// <summary>
        /// Beispiel-Endpoint, der Authentifizierung benötigt
        /// </summary>
        [HttpGet("test")]
        public async Task<IActionResult> Testing()
        {
            string? userId = User.Claims.FirstOrDefault(claim => claim.Type == "sub")?.Value;

            if (userId == null) { return Unauthorized("[ERROR] not found"); }

            var user = await _db.Users.FirstOrDefaultAsync(user => user.ID == userId);

            if (user == null) { return NotFound(); }

            return Ok(new
            {
                user.ID,
                user.Email,
                user.Name,
                user.PictureUrl
            });

        }
    }
}
