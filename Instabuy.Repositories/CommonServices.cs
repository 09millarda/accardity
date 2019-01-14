using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.Sql
{
    public static class CommonServices
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddTransient<IEbaySearchRepository, EbaySearchRepository>();
            services.AddTransient<IFiltersRepository>(options => new SqlFiltersRepository(options.GetService<InstabuyDbContext>()));
            services.AddTransient<IUsersRepository>(options => new SqlUsersRepository(options.GetService<InstabuyDbContext>()));
            services.AddTransient<IApiKeysRepository>(options => new SqlApiKeysRepository(options.GetService<InstabuyDbContext>()));
            services.AddTransient<IHistoricalItemInfoRepository>(options => new SqlHistoricalItemInfoRepository(options.GetService<InstabuyDbContext>()));
            return services;
        }
    }
}
