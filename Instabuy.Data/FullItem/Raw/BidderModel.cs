using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.FullItem.Raw
{
    public class BidderModel
    {
        public string UserId { get; set; }
        public bool FeedbackPrivate { get; set; }
        public string FeedbackRatingStar { get; set; }
        public int FeedbackScore { get; set; }
    }
}
