using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class Filter
    {
        public long FilterId { get; set; }
        public string Name { get; set; }
        public string Categories { get; set; }
        public int CategoryId { get; set; }
        public string Keywords { get; set; }
        public string Conditions { get; set; }
        public int Period { get; set; }
        public DateTimeOffset Created { get; set; }
        public int ExecutionCount { get; set; }
        public DateTimeOffset LastExecuted { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
        public bool Active { get; set; }
    }
}
