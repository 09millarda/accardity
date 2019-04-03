using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbaySearchResultModelNormalized
    {
        public int Count { get; set; }
        public IEnumerable<EbayItemModelNormalized> Items { get; set; }
    }
}
