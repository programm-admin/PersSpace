using Backend.Models;

public interface IUserService
{
    /// <summary>
    /// Checks, whether user exists in DB with given UserAccountID.
    /// </summary>
    Task<bool> ExistsAsync(string userAccountID);

    /// <summary>
    /// Loading user from DB for given user account ID.
    /// </summary>
    Task<M_User?> GetUserAsync(string userAccountID);
}