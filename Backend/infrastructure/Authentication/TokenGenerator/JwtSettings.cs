namespace Infrastructure.Authentication.Token;

public sealed class JwtSettings
{
    public required string JwtSecret { get; set; }
    public required string JwtAudience { get; set; }
    public required string JwtIssuer { get; set; }
}