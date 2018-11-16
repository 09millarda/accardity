using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Instabuy.Data.Sql.Models
{
    public class Filter
    {
        public int FilterId { get; set; }
        public string FilterString { get; set; }
        public string FilterName { get; set; }
        public DateTime Created { get; set; }
        public int User_UserId { get; set; }
        [ForeignKey("User_UserId")]
        public User User { get; set; }
        public bool Active { get; set; }
        public int ExecutionCount { get; set; }
    }
}
