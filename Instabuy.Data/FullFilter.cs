using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class FullFilter
    {
        public Filter Filter { get; set; } = new Filter();
        public IEnumerable<HistoricalEbayItemInfo> HistoricalItems { get; set; } = new List<HistoricalEbayItemInfo>();
    }
}
