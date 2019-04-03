using System.Collections.Generic;

namespace Instabuy.Data
{
    public class EbayCategoryModel
    {
        public List<string> CategoryId { get; set; } = new List<string>();
        public List<string> CategoryName { get; set; } = new List<string>();
    }
}