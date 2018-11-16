using Newtonsoft.Json;
using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbaySearchResultModel
    {
        [JsonProperty(PropertyName = "@count")]
        public int Count { get; set; }
        public List<EbayItemModel> Item { get; set; } = new List<EbayItemModel>();
    }
}