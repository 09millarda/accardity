using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IUsersRepository
    {
        Task<User> Add(string userName, string contactNumber, string contactEmail);
        Task<User> Get(int userId);
        Task<User> Update(int userId, string userName, string contactNumber, string contactEmail);
        Task<bool> Delete(int userId);
    }
}
