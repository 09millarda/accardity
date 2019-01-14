using Instabuy.Data;
using System.Collections.Generic;
using System.Text;

namespace Instabuy.Helpers
{
    public static class EbayHelper
    {
        public static string ItemFilterBuilder(params ItemFilterParameter[] parameters)
        {
            var itemFilters = new List<string>();

            for (int i = 0; i < parameters.Length; i++)
            {
                var itemFilter = new StringBuilder().Append($"itemFilter({i}).name={parameters[i].Name}");

                for (int j = 0; j < parameters[i].Values.Length; j++)
                {
                    itemFilter.Append($"&itemFilter({i}).value({j})={parameters[i].Values[j]}");
                }

                itemFilters.Add(itemFilter.ToString());
            }

            return string.Join('&', itemFilters);
        }
    }
}
