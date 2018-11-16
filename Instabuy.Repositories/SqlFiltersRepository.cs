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

        public async Task<Filter> Add(int userId, string filterString, string filterName)
        {
            var filter = new Sql.Models.Filter
            {
                FilterName = filterName,
                FilterString = filterString,
                User_UserId = userId,
                Created = DateTime.UtcNow,
                Active = false,
                ExecutionCount = 0
            };

            await Context.Filters.AddAsync(filter).ConfigureAwait(false);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return new Filter
            {
                Created = filter.Created,
                FilterId = filter.FilterId,
                FilterName = filter.FilterName,
                FilterString = filter.FilterString,
                UserId = filter.User_UserId,
                Active = filter.Active,
                ExecutionCount = filter.ExecutionCount
            };
        }

        public async Task Counter(int filterId)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId).ConfigureAwait(false);

            filter.ExecutionCount++;

            await Context.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task<bool> Delete(int userId, int filterId)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId && f.User_UserId == userId).ConfigureAwait(false);

            if (filter == null) return false;

            Context.Filters.Remove(filter);
            await Context.SaveChangesAsync().ConfigureAwait(false);

            return true;
        }

        public async Task<Filter> Get(int userId, int filterId)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId && f.User_UserId == userId).ConfigureAwait(false);

            return new Filter
            {
                UserId = filter.User_UserId,
                FilterString = filter.FilterString,
                FilterName = filter.FilterName,
                FilterId = filter.FilterId,
                Created = filter.Created,
                Active = filter.Active,
                ExecutionCount = filter.ExecutionCount
            };
        }

        public async Task<IEnumerable<Filter>> Get(int userId, int[] filterIds)
        {
            var filters = await Context.Filters.Where(f => filterIds.Contains(f.FilterId) && f.User_UserId == userId).ToArrayAsync().ConfigureAwait(false);

            return filters.Select(f => new Filter
            {
                Created = f.Created,
                FilterId = f.FilterId,
                FilterName = f.FilterName,
                FilterString = f.FilterString,
                UserId = f.User_UserId,
                Active = f.Active,
                ExecutionCount = f.ExecutionCount
            });
        }

        public async Task<IEnumerable<Filter>> Get(bool includeInactive = false)
        {
            var filters = await Context.Filters.Where(f => !includeInactive && f.Active == true).ToListAsync().ConfigureAwait(false);

            return filters.Select(f => new Filter
            {
                Active = f.Active,
                Created = f.Created,
                FilterId = f.FilterId,
                FilterName = f.FilterName,
                FilterString = f.FilterString,
                UserId = f.User_UserId,
                ExecutionCount = f.ExecutionCount
            });
        }

        public async Task<IEnumerable<Filter>> Get(int userId)
        {
            var filters = await Context.Filters.Where(f => f.User_UserId == userId).ToListAsync().ConfigureAwait(false);

            return filters.Select(f => new Filter
            {
                Active = f.Active,
                Created = f.Created,
                FilterId = f.FilterId,
                FilterName = f.FilterName,
                FilterString = f.FilterString,
                UserId = f.User_UserId,
                ExecutionCount = f.ExecutionCount
            });
        }

        public async Task<Filter> Update(int userId, int filterId, string filterString, string filterName)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId && f.User_UserId == userId).ConfigureAwait(false);

            if (filter == null) return null;

            filter.FilterName = filterName;
            filter.FilterString = filterString;

            await Context.SaveChangesAsync().ConfigureAwait(false);

            return new Filter
            {
                UserId = filter.User_UserId,
                FilterString = filter.FilterString,
                FilterName = filter.FilterName,
                Created = filter.Created,
                FilterId = filter.FilterId,
                Active = filter.Active,
                ExecutionCount = filter.ExecutionCount
            };
        }
    }
}
