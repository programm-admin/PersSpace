using Google.Apis.Auth;

namespace Infrastructure.Authentication.Google;

public sealed class GoogleTokenValidator(string googleClientId) : IGoogleTokenValidator
{
    public async Task<GoogleJsonWebSignature.Payload?> ValidateAsync(string idToken)
    {
        var settings = new GoogleJsonWebSignature.ValidationSettings
        {
            Audience = new[] { googleClientId }
        };

        try
        {
            return await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
        }
        catch
        {
            return null;
        }
    }
}