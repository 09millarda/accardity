﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data
{
    public interface IEbaySearchRepository
    {
        Task<IEnumerable<EbayItemModelNormalized>> GetHistory(DateTime from, int categoryId, string keywords, int[] conditions);
        Task<IEnumerable<CategoryModel>> GetChildCategories(int categoryId);
    }
}
