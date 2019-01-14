using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IFiltersRepository
    {
        Task<Filter> Add(string name, int categoryId, string keywords, int[] conditions, decimal? priceMin, decimal? priceMax, int? userFeedbackMin);

        Task<Filter> Get(string name);
        Task<Filter> Get(long filterId);
        Task<IEnumerable<Filter>> Get();

        Task<Filter> Update(long filterId, string name, int categoryId, string keywords, int[] conditions, bool active, decimal? priceMin, decimal? priceMax, int? userFeedbackMin);

        Task Delete(long filterId);

        Task IncrementExecutionCount(long filterId);
    }
}
