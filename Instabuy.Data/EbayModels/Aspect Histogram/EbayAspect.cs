using Newtonsoft.Json;
using System.Collections.Generic;

namespace Instabuy.Data.EbayModels.Aspect_Histogram
{
    public class EbayAspect
    {
        [JsonProperty(PropertyName = "@name")]
        public string Name { get; set; }
        public List<EbayAspectValue> ValueHistogram { get; set; }
    }
}