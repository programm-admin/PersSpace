using Domain;

namespace Application.Users;

public interface ICurrentUserService
{
    Task<User> GetCurrentUserAsync();
}