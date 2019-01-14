using System.Collections.Generic;

namespace Instabuy.Data.FullItem.Processed
{
    public class ItemSpecifics
    {
        public string Name { get; set; }
        public IEnumerable<string> Values { get; set; }
    }
}