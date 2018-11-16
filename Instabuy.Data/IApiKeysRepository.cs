using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IApiKeysRepository
    {
        Task<User> GetUserFromApiKey(string apiKey);
    }
}
