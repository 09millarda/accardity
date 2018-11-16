using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public abstract class EbayResponseModel
    {
        public abstract EbayResponseModel Normalize(EbayResponseModel responseModel)
        {

        }
    }
}
