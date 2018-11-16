using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Exceptions
{
    public class NoAuthorizationHeaderProvidedException : Exception
    {
        public NoAuthorizationHeaderProvidedException() : base("No Authorization header was present in the request")
        {

        }
    }
}
