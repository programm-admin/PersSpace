using Google.Apis.Auth;

namespace Infrastructure.Authentication.Google;

public interface IGoogleTokenValidator
{
    Task<GoogleJsonWebSignature.Payload?> ValidateAsync(string idToken);
}