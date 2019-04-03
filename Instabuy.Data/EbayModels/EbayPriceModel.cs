using Newtonsoft.Json;

namespace Instabuy.Data
{
    public class EbayPriceModel
    {
        [JsonProperty(PropertyName = "@currencyId")]
        public string CurrencyId { get; set; }
        [JsonProperty(PropertyName = "__value__")]
        public decimal Value { get; set; }
    }
}