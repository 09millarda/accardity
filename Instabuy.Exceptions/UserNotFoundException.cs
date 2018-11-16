using System;

namespace Instabuy.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
        {

        }

        public UserNotFoundException(string token) : base($"User with api key: {token} not found") { }
    }
}
