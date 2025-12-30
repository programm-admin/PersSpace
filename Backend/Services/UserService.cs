using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class UserService : IUserService
    {
        private readonly AppDBProvider _db;

        public UserService(AppDBProvider db) { _db = db; }


        /// <summary>
        /// Checks, whether user exists in DB with given UserAccountID.
        /// </summary>
        public async Task<bool> ExistsAsync(Guid? userAccountID)
        {
            if (!userAccountID.HasValue || userAccountID == Guid.Empty) return false;

            return await _db.Users.AnyAsync(u => u.ID == userAccountID);
        }

        /// <summary>
        /// Loading user from DB for given user account ID.
        /// </summary>
        public async Task<M_User?> GetUserAsync(Guid? userAccountID)
        {
            if (!userAccountID.HasValue || userAccountID == Guid.Empty)
                return null;

            return await _db.Users.FirstOrDefaultAsync(u => u.ID == userAccountID);
        }
    }
}