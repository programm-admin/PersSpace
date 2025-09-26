using Google.Apis.Auth;

namespace Backend.Services
{
    public class GoogleAuthService
    {
        private readonly string _googleClientId;

        public GoogleAuthService(string googleClientId) { _googleClientId = googleClientId; }


        public async Task<GoogleJsonWebSignature.Payload?> ValidateAsync(string idToken)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { _googleClientId }
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
}
