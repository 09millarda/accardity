using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class FindCompletedItemsResponseModel
    {
        public List<EbayResponseModel> FindCompletedItemsResponse { get; set; } = new List<EbayResponseModel>();
    }
}
