using System.Collections.Generic;

namespace Instabuy.Data.EbayModels.Aspect_Histogram
{
    public class EbayAspectHistogramContainer
    {
        public List<string> DomainDisplayName { get; set; }
        public List<EbayAspect> Aspect { get; set; }
    }
}