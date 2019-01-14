using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.FullItem.Raw
{
    public class SellerModel
    {
        public string UserId { get; set; }
        public string FeedbackRatingStar { get; set; }
        public int FeedbackScore { get; set; }
        public decimal PositiveFeedbackPercent { get; set; }
    }
}
