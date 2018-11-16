using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IFiltersRepository
    {
        Task<Filter> Add(int userId, string filterString, string filterName);
        Task<bool> Delete(int userId, int filterId);
        Task<Filter> Update(int userId, int filterId, string filterString, string filterName);
        Task Counter(int filterId);
        /// <summary>
        /// Get a filter by id
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="filterId">Id of the filter</param>
        /// <returns></returns>
        Task<Filter> Get(int userId, int filterId);
        /// <summary>
        /// Get all filters
        /// </summary>
        /// <param name="includeInactive">Whether to include inactive filters. Default = true</param>
        /// <returns></returns>
        Task<IEnumerable<Filter>> Get(bool includeInactive = false);
        /// <summary>
        /// Get filters based on userId an array of filterIds
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <param name="filterIds">Array of filter Ids</param>
        /// <returns></returns>
        Task<IEnumerable<Filter>> Get(int userId, int[] filterIds);
        /// <summary>
        /// Get filters belonging to a user
        /// </summary>
        /// <param name="userId">Id of the user</param>
        /// <returns></returns>
        Task<IEnumerable<Filter>> Get(int userId);
    }
}
