using Backend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Backend.Services
{
    public class TokenService
    {
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;
        private readonly string _jwtSecret;


        public TokenService(string jwtSecret, string jwtIssuer, string jwtAudience)
        {
            _jwtAudience = jwtAudience;
            _jwtIssuer = jwtIssuer;
            _jwtSecret = jwtSecret;
        }


        public string CreateAccessToken(M_User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.ID.ToString("D")),
                new Claim(JwtRegisteredClaimNames.Name, user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecret));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer: _jwtIssuer, audience: _jwtAudience, claims: claims, expires: DateTime.UtcNow.AddDays(2), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
