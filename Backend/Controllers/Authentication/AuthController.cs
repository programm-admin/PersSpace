using Backend.Data;
using Backend.Models;
using Backend.Services;
using Backend.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Authentication
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDBProvider _db;
        private readonly TokenService _tokenService;
        private readonly GoogleAuthService _googleAuthService;

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
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(10)
            });

            Response.Cookies.Append(AuthConstants.KEY_REFRESH_TOKEN, refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(30)
            });
        }

        private void DeleteAuthCookies()
        {
            Response.Cookies.Delete(AuthConstants.KEY_ACCESS_TOKEN);
            Response.Cookies.Delete(AuthConstants.KEY_REFRESH_TOKEN);
        }

        /// <summary>
        /// Frontend sendet Google ID Token → Backend validiert → erstellt eigenen Access + Refresh Token
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] string idToken)
        {
            if (string.IsNullOrEmpty(idToken)) { return BadRequest("[ERROR] id token is required."); }

            var payload = await _googleAuthService.ValidateAsync(idToken);

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
                    user = new {user.ID, user.Email, user.PictureUrl}
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

            if (storedToken == null || storedToken.RevokedAt != null || storedToken.ExpiresAt < DateTime.UtcNow) { return Unauthorized("[ERROR] Refresh token invalid or expired."); }

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

            return Ok(new { message = "Tokens refreshed successfully." });
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
