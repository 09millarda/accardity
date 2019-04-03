using Newtonsoft.Json;
using System.Collections.Generic;

namespace Instabuy.Data.EbayModels.Aspect_Histogram
{
    public class EbayAspectValue
    {
        [JsonProperty(PropertyName = "@valueName")]
        public string ValueName { get; set; }
        public List<int> Count { get; set; }
    }
}