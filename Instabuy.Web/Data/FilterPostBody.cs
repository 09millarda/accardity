using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instabuy.Web.Data
{
    public class FilterPostBody
    {
        public string FilterName { get; set; }
        public int[] Categories { get; set; }
        public string Keywords { get; set; }
        public int[] Conditions { get; set; }
        public int Period { get; set; }
    }
}
