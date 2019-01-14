using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instabuy.Data.Web
{
    public class HttpFilter
    {
        public int FilterId { get; set; }
        public bool Active { get; set; }
        public string FilterName { get; set; }
        public int CategoryId { get; set; }
        public string Keywords { get; set; }
        public int[] Conditions { get; set; }
        public decimal? PriceMin { get; set; }
        public decimal? PriceMax { get; set; }
        public int? UserFeedbackMin { get; set; }
    }
}
