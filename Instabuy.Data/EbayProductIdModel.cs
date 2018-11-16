using Newtonsoft.Json;

namespace Instabuy.Data
{
    public class EbayProductIdModel
    {
        [JsonProperty(PropertyName = "@type")]
        public string Type { get; set; }
        [JsonProperty(PropertyName = "__value__")]
        public string Value { get; set; }
    }
}