using System;
using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayResponseModel
    {
        public List<string> Ack { get; set; } = new List<string>();
        public List<string> Version { get; set; } = new List<string>();
        public List<DateTime> Timestamp { get; set; } = new List<DateTime>();
        public List<EbaySearchResultModel> SearchResult { get; set; } = new List<EbaySearchResultModel>();
        public List<EbayPaginationOutputModel> PaginationOutput { get; set; } = new List<EbayPaginationOutputModel>();
    }
}