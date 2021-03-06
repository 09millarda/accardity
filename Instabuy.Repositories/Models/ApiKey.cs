﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Instabuy.Data.Sql.Models
{
    public class ApiKey
    {
        public int ApiKeyId { get; set; }
        public string Key { get; set; }
        public int User_UserId { get; set; }
        [ForeignKey("User_UserId")]
        public User User { get; set; }
    }
}
