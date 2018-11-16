using Instabuy.Data;
using Instabuy.Exceptions;
using System;
using System.Threading.Tasks;

namespace Instabuy.Common
{
    internal class UserScopeAccessor : IUserScopeAccessor
    {
        private readonly IApiKeysRepository _apiKeysRepository;
        public User User { get; private set; }

        public UserScopeAccessor(IApiKeysRepository apiKeysRepository)
        {
            _apiKeysRepository = apiKeysRepository;
        }

        public async Task GetUserFromToken(string token)
        {
            string tokenAck;

            try
            {
                tokenAck = token.Split(' ')[1];
            }
            catch (Exception)
            {
                throw new UserNotFoundException(token);
            }

            var user = await _apiKeysRepository.GetUserFromApiKey(tokenAck).ConfigureAwait(false);

            User = user ?? throw new UserNotFoundException(token);
        }
    }
}
