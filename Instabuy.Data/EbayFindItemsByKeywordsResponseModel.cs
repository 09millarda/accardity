using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class EbayFindItemsByKeywordsResponse
    {
        public List<EbayResponseModel> FindItemsByKeywordsResponse { get; set; } = new List<EbayResponseModel>();
    }
}
