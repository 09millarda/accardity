using System;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Data.Sql.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string ContactNumber { get; set; }
        public string ContactEmail { get; set; }
    }
}
