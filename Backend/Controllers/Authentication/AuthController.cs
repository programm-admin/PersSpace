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


        /// <summary>
        /// Frontend sendet Google ID Token → Backend validiert → erstellt eigenen Access + Refresh Token
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Req_Login idToken)
        {
            if (string.IsNullOrEmpty(idToken.token)) { return BadRequest("[ERROR] id token is required."); }

            var payload = await _googleAuthService.ValidateAsync(idToken.token);

            if (payload == null) { return Unauthorized("[ERROR] id token is invalid"); }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.ID == payload.Subject);

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

            await _db.SaveChangesAsync();

            return Ok(
                new
                {
                    message = "Erfolgreich eingeloggt",
                    userID = user.ID,
                    email = user.Email,
                    picture = user.PictureUrl,
                    userName = user.Name,
                    AccessToken = accessToken,
                }
            );
        }

        /// <summary>
        /// Beendet die Session und widerruft den Refresh Token
        /// </summary>
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
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

            string? accessToken = Request.Headers["access_token"].FirstOrDefault();
            string? userId = Request.Headers["user_id"].FirstOrDefault();

            if (string.IsNullOrWhiteSpace(accessToken) ||
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
                return Unauthorized(new { success = false, error = "Invalid access token." });
            }

            var expClaim = jwt.Claims.FirstOrDefault(c => c.Type == "exp")?.Value;
            if (expClaim == null || !long.TryParse(expClaim, out var expSeconds))
            {
                return Unauthorized(new { success = false, error = "Access token missing exp." });
            }

            DateTime tokenExpiry = DateTimeOffset.FromUnixTimeSeconds(expSeconds).UtcDateTime;

            if (tokenExpiry <= DateTime.UtcNow)
            {
                return Unauthorized(new { success = false, error = "Access token expired." });
            }

            // -----------------------------
            // 2. check user in db
            // -----------------------------
            var user = await _db.Users.FirstOrDefaultAsync(u => u.ID == userId);
            if (user == null)
            {
                return Unauthorized(new { success = false, error = "User not found." });
            }


            // -----------------------------
            // 3. Tokens erneuern
            // -----------------------------
            string newAccessToken = _tokenService.CreateAccessToken(user);


            await _db.SaveChangesAsync();


            return Ok(new
            {
                success = true,
                userID = user.ID,
                email = user.Email,
                picture = user.PictureUrl,
                userName = user.Name,
                AccessToken = newAccessToken,
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
