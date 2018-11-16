using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IUserScopeAccessor
    {
        User User { get; }
        Task GetUserFromToken(string token);
    }
}
