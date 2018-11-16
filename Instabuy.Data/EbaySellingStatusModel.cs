using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbaySellingStatusModel
    {
        public List<EbayPriceModel> CurrentPrice { get; set; } = new List<EbayPriceModel>();
        public List<EbayPriceModel> ConvertedCurrentPrice { get; set; } = new List<EbayPriceModel>();
        public List<string> SellingState { get; set; } = new List<string>();
        public List<string> TimeLeft { get; set; } = new List<string>();
    }
}