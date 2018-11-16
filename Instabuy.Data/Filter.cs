using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class Filter
    {
        public int FilterId { get; set; }
        public string FilterString { get; set; }
        public string FilterName { get; set; }
        public int UserId { get; set; }
        public DateTime Created { get; set; }
        public bool Active { get; set; }
        public int ExecutionCount { get; set; }
    }
}
