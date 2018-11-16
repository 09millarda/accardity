using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class GetCategoryInfoResponseModel
    {
        public EbayCategoryResponseModel GetCategoryInfoResponse { get; set; }
    }

    public class EbayCategoryResponseModel
    {
        public EbayCategoryArrayModel CategoryArray { get; set; }
    }

    public class EbayCategoryArrayModel
    {
        public List<CategoryModel> Category { get; set; } = new List<CategoryModel>();
    }

    public class CategoryModel
    {
        public string CategoryName { get; set; }
        public int CategoryID { get; set; }
        public bool LeafCategory { get; set; }
        public int CategoryParentID { get; set; }
    }
}
