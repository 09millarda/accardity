using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayResponseModelNormalized
    {
        public string Ack { get; set; }
        public string Version { get; set; }
        public DateTime Timestamp { get; set; }
        public EbaySearchResultModelNormalized SearchResult { get; set; }
        public EbayPaginationOutputModelNormalized PaginationOutput { get; set; }
    }
}
