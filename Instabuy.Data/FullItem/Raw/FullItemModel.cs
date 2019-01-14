using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.FullItem.Raw
{
    public class FullItemModel
    {
        public DateTime Timestamp { get; set; }
        public List<EbayItemModel> Item { get; set; } = new List<EbayItemModel>();
    }
}
