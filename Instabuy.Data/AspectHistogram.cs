using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class AspectHistogram
    {
        public string AspectName { get; set; }
        public IEnumerable<Aspect> Aspects { get; set; }
    }
}
