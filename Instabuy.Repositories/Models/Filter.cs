using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using Instabuy.Data;

namespace Instabuy.Data.Sql.Models
{
    public class Filter
    {
        public int FilterId { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public string Keywords { get; set; }
        public string Conditions { get; set; }
        public DateTimeOffset Created { get; set; }
        public int ExecutionCount { get; set; }
        public DateTimeOffset LastExecuted { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
        public bool IsActive { get; set; }
        public decimal? PriceMin { get; set; }
        public decimal? PriceMax { get; set; }
        public int? UserFeedbackMin { get; set; }

        public Data.Filter Parse()
        {
            return new Data.Filter
            {
                CategoryId = CategoryId,
                Conditions = Conditions.Split(',').Select(c => int.Parse(c)),
                Created = Created,
                ExecutionCount = ExecutionCount,
                FilterId = FilterId,
                Keywords = Keywords,
                LastExecuted = LastExecuted,
                LastUpdated = LastUpdated,
                Name = Name,
                IsActive = IsActive,
                PriceMax = PriceMax,
                PriceMin = PriceMin,
                UserFeedbackMin = UserFeedbackMin
            };
        }
    }
}
