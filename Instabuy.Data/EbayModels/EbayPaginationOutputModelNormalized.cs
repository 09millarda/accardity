using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayPaginationOutputModelNormalized
    {
        public int PageNumber { get; set; }
        public int EntriesPerPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalEntries { get; set; }
    }
}
