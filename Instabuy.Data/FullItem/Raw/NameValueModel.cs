using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.FullItem.Raw
{
    public class NameValueModel
    {
        public string Name { get; set; }
        public List<string> Value { get; set; } = new List<string>();
    }
}
