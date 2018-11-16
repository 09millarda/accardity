using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayPaginationOutputModel
    {
        public List<int> PageNumber { get; set; } = new List<int>();
        public List<int> EntriesPerPage { get; set; } = new List<int>();
        public List<int> TotalPages { get; set; } = new List<int>();
        public List<int> TotalEntries { get; set; } = new List<int>();
    }
}