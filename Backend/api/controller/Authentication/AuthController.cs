using Api.Settings;
using Backend.Data;
using Domain;
using Infrastructure.Authentication.Google;
using Infrastructure.Authentication.Token;
using Infrastructure.Authentication.Users;
using Infrastructure.Entities;
using Infrastructure.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Authentication;

[ApiController]
[Route("auth")]
public class AuthController(AppDBProvider db, AccessTokenGenerator tokenService, GoogleTokenValidator googleAuthService, CurrentUserService currentUserService) : ControllerBase
{
    public class Req_Login
    {
        public string token { get; set; } = string.Empty;
    }


    private void DeleteAuthCookies()
    {
        Response.Cookies.Delete(CookieSettings.AuthCookieName);
    }


    /// <summary>
    /// Endpoint for user login. | 
    /// get Google ID Token (JWT) from frontend -> validating token via backend -> creating new access token for sending to frontend (for session check)
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Req_Login idToken)
    {
        if (string.IsNullOrEmpty(idToken.token)) { return BadRequest("[ERROR] id token is required."); }

        var payload = await googleAuthService.ValidateAsync(idToken.token);

        if (payload == null) { return Unauthorized("[ERROR] id token is invalid"); }

        UserEntity? user = await db.Users.FirstOrDefaultAsync(u => u.GoogleID == payload.Subject);

        if (user is null)
        {
            // create user if not already existing
            user = new UserEntity
            {
                ID = Guid.NewGuid(),
                Name = payload.Name,
                Email = payload.Email,
                PictureUrl = payload.Picture,
                GoogleID = payload.Subject
            };

            db.Users.Add(user);
        }


        string accessToken = tokenService.CreateAccessToken(UserMapper.ToDomain(user));

        await db.SaveChangesAsync();

        Response.Cookies.Append(CookieSettings.AuthCookieName, accessToken, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Lax,
            Path = "/",
            Expires = DateTimeOffset.UtcNow.AddHours(10)
        });

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
    [Authorize]
    public async Task<IActionResult> CheckAuthStatus()
    {
        User user = currentUserService.GetCurrentUserAsync().Result;

        return Ok(new
        {
            success = true,
            userID = user.ID,
            email = user.Email,
            picture = user.PictureUrl,
            userName = user.Name
        });
    }

    [HttpGet("logout")]
    public Task<IActionResult> LogoutUser()
    {

        DeleteAuthCookies(); // logout user if session is invalid/ has expired
        return Task.FromResult<IActionResult>(Ok(new { success = true }));

    }
}