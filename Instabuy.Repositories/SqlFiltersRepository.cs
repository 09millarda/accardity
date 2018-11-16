using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data.Sql
{
    internal class SqlFiltersRepository : SqlBaseContext, IFiltersRepository
    {
        public SqlFiltersRepository(InstabuyDbContext context) : base(context) { }

        public async Task<Filter> Add(string name, int[] categories, int categoryId, string keywords, int[] conditions, int period)
        {
            var filter = new Models.Filter
            {
                Active = true,
                Created = DateTimeOffset.UtcNow,
                ExecutionCount = 0,
                Categories = string.Join(",", categories),
                Conditions = string.Join(",", conditions),
                CategoryId = categoryId,
                Keywords = keywords,
                LastExecuted = DateTimeOffset.UtcNow,
                LastUpdated = DateTimeOffset.UtcNow,
                Name = name,
                Period = period
            };

            await Context.Filters.AddAsync(filter).ConfigureAwait(false);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return new Filter
            {
                Active = filter.Active,
                Categories = filter.Categories,
                CategoryId = filter.CategoryId,
                Conditions = filter.Conditions,
                Created = filter.Created,
                ExecutionCount = filter.ExecutionCount,
                FilterId = filter.FilterId,
                Keywords = filter.Keywords,
                LastExecuted = filter.LastExecuted,
                LastUpdated = filter.LastUpdated,
                Name = filter.Name,
                Period = filter.Period
            };
        }
    }
}
