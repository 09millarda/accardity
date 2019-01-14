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

        public async Task<Filter> Add(string name, int categoryId, string keywords, int[] conditions, decimal? priceMin, decimal? priceMax, int? userFeedbackMin)
        {
            var filter = new Models.Filter
            {
                IsActive = false,
                Created = DateTimeOffset.UtcNow,
                ExecutionCount = 0,
                Conditions = string.Join(",", conditions),
                CategoryId = categoryId,
                Keywords = keywords,
                LastExecuted = DateTimeOffset.UtcNow,
                LastUpdated = DateTimeOffset.UtcNow,
                Name = name,
                PriceMax = priceMax,
                PriceMin = priceMin,
                UserFeedbackMin = userFeedbackMin
            };

            await Context.Filters.AddAsync(filter).ConfigureAwait(false);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return filter.Parse();
        }

        public async Task Delete(long filterId)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId).ConfigureAwait(false);

            Context.Filters.Remove(filter);
            await Context.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task<Filter> Get(string name)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.Name == name).ConfigureAwait(false);

            if (filter == null) return null;

            return filter.Parse();
        }

        public async Task<Filter> Get(long filterId)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId).ConfigureAwait(false);

            if (filter == null) return null;

            return filter.Parse();
        }

        public async Task<IEnumerable<Filter>> Get()
        {
            var filters = await Context.Filters.ToListAsync().ConfigureAwait(false);
            return filters.Select(f => f.Parse());
        }

        public async Task IncrementExecutionCount(long filterId)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId).ConfigureAwait(false);

            filter.FilterId++;

            Context.Filters.Update(filter);

            await Context.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task<Filter> Update(long filterId, string name, int categoryId, string keywords, int[] conditions, bool active, decimal? priceMin, decimal? priceMax, int? userFeedbackMin)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId).ConfigureAwait(false);

            if (filter == null) return null;

            filter.Name = name;
            filter.Conditions = string.Join(",", conditions);
            filter.IsActive = active;
            filter.CategoryId = categoryId;
            filter.Keywords = keywords;
            filter.LastUpdated = DateTimeOffset.UtcNow;
            filter.PriceMin = priceMin;
            filter.PriceMax = priceMax;
            filter.UserFeedbackMin = userFeedbackMin;

            Context.Update(filter);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return filter.Parse();
        }
    }
}
