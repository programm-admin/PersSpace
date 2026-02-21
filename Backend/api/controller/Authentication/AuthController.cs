using Api.Settings;
using Backend.Data;
using Domain;
using Infrastructure.Authentication.Google;
using Infrastructure.Authentication.Token;
using Infrastructure.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers.Authentication;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly AppDBProvider _db;
    private readonly AccessTokenGenerator _tokenService;
    private readonly GoogleTokenValidator _googleAuthService;

    public class Req_Login
    {
        public string token { get; set; } = string.Empty;
    }

    public AuthController(AppDBProvider db, AccessTokenGenerator tokenService, GoogleTokenValidator googleAuthService)
    {
        _db = db;
        _tokenService = tokenService;
        _googleAuthService = googleAuthService;
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

        var payload = await _googleAuthService.ValidateAsync(idToken.token);

        if (payload == null) { return Unauthorized("[ERROR] id token is invalid"); }

        UserEntity? user = await _db.Users.FirstOrDefaultAsync(u => u.GoogleID == payload.Subject);

        if (user is null)
        {
            // create user if not already existing
            user = new User
            (
                Guid.NewGuid(),
                payload.Name,
                payload.Email,
                payload.Picture,
                payload.Subject
            );

            _db.Users.Add(user);
        }

        string accessToken = _tokenService.CreateAccessToken(user);

        await _db.SaveChangesAsync();

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
    public Task<IActionResult> CheckAuthStatus()
    {
        // getting user from user middleware
        if (HttpContext.Items["User"] is not User user)
        {
            DeleteAuthCookies(); // logout user if session is invalid/ has expired
            return Task.FromResult<IActionResult>(Unauthorized(new { success = false }));
        }

        return Task.FromResult<IActionResult>(Ok(new
        {
            success = true,
            userID = user.ID,
            email = user.Email,
            picture = user.PictureUrl,
            userName = user.Name
        }));
    }

    [HttpGet("logout")]
    public Task<IActionResult> LogoutUser()
    {

        DeleteAuthCookies(); // logout user if session is invalid/ has expired
        return Task.FromResult<IActionResult>(Ok(new { success = true }));

    }
}