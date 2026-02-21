using Domain;

namespace Infrastructure.Authentication.Token;

public interface IAccessTokenGenerator
{
    public string CreateAccessToken(User user);
}