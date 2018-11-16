using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data.Sql
{
    internal class SqlApiKeysRepository : SqlBaseContext, IApiKeysRepository
    {
        public SqlApiKeysRepository(InstabuyDbContext context) : base(context) { }

        public async Task<User> GetUserFromApiKey(string apiKey)
        {
            var key = await Context.ApiKeys.Include(k => k.User).FirstOrDefaultAsync(k => k.Key == apiKey).ConfigureAwait(false);

            if (key == null) return null;

            return new User
            {
                ContactEmail = key.User.ContactEmail,
                ContactNumber = key.User.ContactNumber,
                UserId = key.User.UserId,
                UserName = key.User.UserName
            };
        }
    }
}
