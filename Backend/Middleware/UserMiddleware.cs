using System.IdentityModel.Tokens.Jwt;
using Api.Settings;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Middleware;

/// <summary>
/// Middleware for authenticating user via HTTP only cookie.
/// </summary>
public class UserMiddleware
{
    private readonly RequestDelegate _next;

    public UserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, AppDBProvider db)
    {
        // get cookie from request
        // HttpOnly ookies are ALWAYS available at this point (if set)
        if (!context.Request.Cookies.TryGetValue(CookieSettings.AuthCookieName, out var accessToken)
            || string.IsNullOrWhiteSpace(accessToken))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Missing auth cookie.");
            return;
        }

        // read JWT
        JwtSecurityToken jwt;
        try
        {
            jwt = new JwtSecurityTokenHandler().ReadJwtToken(accessToken);
        }
        catch
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Invalid JWT token.");
            return;
        }

        // check existence of JWT expiration date
        var expClaim = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Exp)?.Value;
        if (expClaim == null || !long.TryParse(expClaim, out var expSeconds))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Token expiration date missing.");
            return;
        }

        // check if JWT is expired
        var tokenExpiry = DateTimeOffset.FromUnixTimeSeconds(expSeconds).UtcDateTime;
        if (tokenExpiry <= DateTime.UtcNow)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Token expired.");
            return;
        }

        // get user ID from token
        var userIdClaim = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrWhiteSpace(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Invalid user id.");
            return;
        }

        // check user in DB
        var user = await db.Users.FirstOrDefaultAsync(u => u.ID == userId);

        if (user == null)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] User not found.");
            return;
        }

        // make found user available in controller
        context.Items["User"] = user;
        context.Items["UserID"] = userId;

        await _next(context);
    }
}
