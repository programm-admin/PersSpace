using System.IdentityModel.Tokens.Jwt;
using Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Middleware;

public class UserMiddleware
{
    private readonly RequestDelegate _next;

    public UserMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, AppDBProvider db)
    {
        // get access token from request header
        string? accessToken = context.Request.Headers["access_token"].FirstOrDefault();

        if (string.IsNullOrWhiteSpace(accessToken))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Missing access token.");
            return;
        }

        // read access token and extract user account from it
        JwtSecurityToken jwt;
        try
        {
            jwt = new JwtSecurityTokenHandler().ReadJwtToken(accessToken);
        }
        catch
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Invalid access token.");
            return;
        }

        // check whether access token is valid or already expired
        var expClaim = jwt.Claims.FirstOrDefault(c => c.Type == "exp")?.Value;
        if (expClaim == null || !long.TryParse(expClaim, out var expSeconds))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Expiration date is missing in access token.");
            return;
        }

        var tokenExpiry = DateTimeOffset.FromUnixTimeSeconds(expSeconds).UtcDateTime;
        if (tokenExpiry <= DateTime.UtcNow)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] Access token is expired.");
            return;
        }

        // get user from user account ID from access token
        string? userIdClaim = jwt.Claims.FirstOrDefault(c => c.Type == JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrWhiteSpace(userIdClaim))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] UserID is missing in token.");
            return;
        }
        if (!Guid.TryParse(userIdClaim, out var userId))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("[ERROR] UserID is invalid in token.");
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

        // provide user for next instance, e.g. controller
        context.Items["User"] = user;
        context.Items["UserID"] = userId;

        await _next(context);
    }
}
