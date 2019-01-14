using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class Filter
    {
        public long FilterId { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string Keywords { get; set; }
        public IEnumerable<int> Conditions { get; set; }
        public DateTimeOffset Created { get; set; }
        public int ExecutionCount { get; set; }
        public DateTimeOffset LastExecuted { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
        public bool IsActive { get; set; }
        public decimal? PriceMin { get; set; }
        public decimal? PriceMax { get; set; }
        public int? UserFeedbackMin { get; set; }
    }
}
