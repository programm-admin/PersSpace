
using Domain;

public static class HttpContextExtensions
{
    public static User GetUser(this HttpContext context)
    {
        if (!context.Items.TryGetValue("User", out var userObj) || userObj is not User user)
        {
            throw new UnauthorizedAccessException("[ERROR - HttpContextExtensions.GetUser()] User is not available in context.");
        }
        return user;
    }

    public static Guid GetUserID(this HttpContext context)
    {
        if (!context.Items.TryGetValue("UserID", out var userIDObj) || userIDObj is not Guid userID)
        {
            throw new UnauthorizedAccessException("[ERROR - HttpContextExtensions.GetUserID()] UserID is not available in context.");
        }
        return userID;
    }
}