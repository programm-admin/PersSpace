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


        // private void SetAuthCookies(string accessToken, string refreshToken)
        // {
        //     Response.Cookies.Append(AuthConstants.KEY_ACCESS_TOKEN, accessToken, new CookieOptions
        //     {
        //         HttpOnly = true,
        //         Secure = false,
        //         SameSite = SameSiteMode.None,
        //         Expires = DateTime.UtcNow.AddMinutes(10),
        //         MaxAge = TimeSpan.FromMinutes(10)
        //     });

        //     Response.Cookies.Append(AuthConstants.KEY_REFRESH_TOKEN, refreshToken, new CookieOptions
        //     {
        //         HttpOnly = true,
        //         Secure = false,
        //         SameSite = SameSiteMode.None,
        //         Expires = DateTime.UtcNow.AddMinutes(30),
        //         MaxAge = TimeSpan.FromMinutes(10)
        //     });
        // }

        // private void DeleteAuthCookies()
        // {
        //     Response.Cookies.Delete(AuthConstants.KEY_ACCESS_TOKEN);
        //     Response.Cookies.Delete(AuthConstants.KEY_REFRESH_TOKEN);
        // }


        /// <summary>
        /// Endpoint for user login. | 
        /// get Google ID Token (JWT) from frontend -> validating token via backend -> creating new access token for sending to frontend (for session check)
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Req_Login idToken)
        {
            if (string.IsNullOrEmpty(idToken.token)) { return BadRequest("[ERROR] id token is required."); }

            var payload = await _googleAuthService.ValidateAsync(idToken.token);

            if (payload == null) { return Unauthorized("[ERROR] id token is invalid"); }

            var user = await _db.Users.FirstOrDefaultAsync(u => u.GoogleID == payload.Subject);

            if (user == null)
            {
                // create user if not already existing
                user = new M_User
                {
                    ID = Guid.NewGuid(),
                    Email = payload.Email,
                    Name = payload.Name,
                    PictureUrl = payload.Picture,
                    GoogleID = payload.Subject,
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
        /// Endpoint for checking whether session of user login is still active.
        /// </summary>
        [HttpGet("check")]
        public Task<IActionResult> CheckAuthStatus()
        {
            // getting user from user middleware
            if (HttpContext.Items["User"] is not M_User user)
                return Task.FromResult<IActionResult>(Unauthorized(new { success = false }));

            return Task.FromResult<IActionResult>(Ok(new
            {
                success = true,
                userID = user.ID,
                email = user.Email,
                picture = user.PictureUrl,
                userName = user.Name
            }));
        }
    }
}
