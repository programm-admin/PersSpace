using System.Security.Claims;
using Domain;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Infrastructure.Authentication.Token;

public sealed class AccessTokenGenerator(JwtSettings settings) : IAccessTokenGenerator
{
    public string CreateAccessToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.ID.ToString("D")),
                new Claim(JwtRegisteredClaimNames.Name, user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(settings.JwtSecret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);
        var token = new JwtSecurityToken(issuer: settings.JwtIssuer, audience: settings.JwtAudience, claims: claims, expires: DateTime.UtcNow.AddHours(10), signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}