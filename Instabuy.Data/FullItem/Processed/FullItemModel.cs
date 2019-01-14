using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.FullItem.Processed
{
    public class FullItemModel
    {
        public DateTime TimeStamp { get; set; }
        public List<EbayItemModel> Items { get; set; }
    }
}
