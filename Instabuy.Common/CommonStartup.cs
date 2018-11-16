using Instabuy.Data;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Common
{
    public static class CommonStartup
    {
        public static IServiceCollection AddCommon(this IServiceCollection services)
        {
            services.AddScoped<IUserScopeAccessor, UserScopeAccessor>();
            return services;
        }
    }
}
