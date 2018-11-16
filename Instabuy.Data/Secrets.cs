using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data
{
    public class Secrets
    {
        public ApiKeysModel Api_Keys { get; set; }
    }

    public class ApiKeysModel
    {
        public string Ebay_Client_Id { get; set; }
        public string Ebay_Dev_Id { get; set; }
        public string Ebay_Client_Secret { get; set; }
        public string OAuth_Application_Token { get; set; }
    }
}
