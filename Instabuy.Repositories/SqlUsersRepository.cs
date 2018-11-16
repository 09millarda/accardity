using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data.Sql
{
    internal class SqlUsersRepository : SqlBaseContext, IUsersRepository
    {
        public SqlUsersRepository(InstabuyDbContext context) : base(context) { }

        public async Task<User> Add(string userName, string contactNumber, string contactEmail)
        {
            var user = new Sql.Models.User
            {
                ContactEmail = contactEmail,
                ContactNumber = contactNumber,
                UserName = userName
            };

            await Context.Users.AddAsync(user).ConfigureAwait(false);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return new User
            {
                ContactEmail = user.ContactEmail,
                ContactNumber = user.ContactNumber,
                UserId = user.UserId,
                UserName = user.UserName
            };
        }

        public async Task<bool> Delete(int userId)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.UserId == userId).ConfigureAwait(false);

            if (user == null) return false;

            Context.Users.Remove(user);
            await Context.SaveChangesAsync(false);

            return true;
        }

        public async Task<User> Get(int userId)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.UserId == userId).ConfigureAwait(false);

            return new User
            {
                UserName = user.UserName,
                UserId = user.UserId,
                ContactNumber = user.ContactNumber,
                ContactEmail = user.ContactEmail
            };
        }

        public async Task<User> Update(int userId, string userName, string contactNumber, string contactEmail)
        {
            var user = await Context.Users.FirstOrDefaultAsync(u => u.UserId == userId).ConfigureAwait(false);

            if (user == null) return null;

            user.UserName = userName;
            user.ContactNumber = contactNumber;
            user.ContactEmail = contactEmail;

            await Context.SaveChangesAsync();

            return new User
            {
                ContactEmail = user.ContactEmail,
                ContactNumber = user.ContactNumber,
                UserId = user.UserId,
                UserName = user.UserName
            };
        }
    }
}
