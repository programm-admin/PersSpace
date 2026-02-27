using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Api.Settings;
using Application.Users;
using Backend.Data;
using Domain;
using Infrastructure.Entities;
using Infrastructure.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Authentication.Users;

public sealed class CurrentUserService(IHttpContextAccessor httpContextAccessor, AppDBProvider db) : ICurrentUserService
{
    public async Task<User> GetCurrentUserAsync()
    {
        HttpContext? httpContext = httpContextAccessor.HttpContext;

        if (httpContext is null || httpContext.User.Identity?.IsAuthenticated != true)
        {
            Logout(httpContext);
            throw new UnauthorizedAccessException("[ERROR] User not authenticated because no context is given.");
        }

        string? userIdClaim = httpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? httpContext.User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;

        if (userIdClaim is null || !Guid.TryParse(userIdClaim, out var userIdGuid))
        {
            Logout(httpContext);
            throw new UnauthorizedAccessException("[ERROR] Invalid user claim.");
        }

        UserEntity? foundUser = await db.Users.FirstOrDefaultAsync(u => u.ID == userIdGuid);

        if (foundUser is null)
        {
            Logout(httpContext);
            throw new UnauthorizedAccessException("[ERROR] User not found.");
        }

        return UserMapper.ToDomain(foundUser);
    }

    private static void Logout(HttpContext? httpContext)
    {
        if (httpContext is null) return;

        httpContext.Response.Cookies.Delete(
            CookieSettings.AuthCookieName,
            new CookieOptions
            {
                Path = "/",
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.Lax
            }
        );
    }
}