using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IFiltersRepository
    {
        Task<Filter> Add(string name, int[] categories, int categoryId, string keywords, int[] conditions, int period);
    }
}
