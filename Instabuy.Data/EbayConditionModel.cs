using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayConditionModel
    {
        public List<int> ConditionId { get; set; } = new List<int>();
        public List<string> ConditionDisplayName { get; set; } = new List<string>();
    }
}