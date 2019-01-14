using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IHistoricalItemInfoRepository
    {
        Task<IEnumerable<HistoricalEbayItemInfo>> AddRange(long filterId, IEnumerable<HistoricalEbayItemInfo> items);

        Task<IEnumerable<HistoricalEbayItemInfo>> GetRelated(long filterId);

        Task RemoveRelated(long filterId);
    }
}
