using System.Collections.Generic;

namespace Instabuy.Data.EbayModels.Aspect_Histogram
{
    public class EbayGetHistogramResponse
    {
        public List<string> Ack { get; set; }
        public List<EbayAspectHistogramContainer> AspectHistogramContainer { get; set; }
    }
}