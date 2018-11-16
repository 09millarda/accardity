using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Instabuy.Data;
using Microsoft.AspNetCore.Mvc;

namespace Instabuy.Web.Controllers
{
    [Route("api/ebay")]
    [ApiController]
    [Produces("application/json")]
    public class EbayController : ControllerBase
    {
        private readonly IEbaySearchRepository _ebaySearchRepository;

        public EbayController(IEbaySearchRepository ebaySearchRepository)
        {
            _ebaySearchRepository = ebaySearchRepository;
        }

        [HttpGet("history/{categoryId}/{filterString}/{conditions}/{daysBack}")]
        [Produces(typeof(IEnumerable<EbayItemModelNormalized>))]
        public async Task<IActionResult> GetFilterHistory(int categoryId, string filterString, string conditions, int daysBack)
        {
            filterString = filterString.Replace(' ', '+');

            var historicalItems = await _ebaySearchRepository.GetHistory(DateTimeOffset.UtcNow.Date.AddDays(-daysBack), categoryId, filterString, conditions.Split(',').Select(c => int.Parse(c)).ToArray()).ConfigureAwait(false);

            return Ok(historicalItems);
        }

        [HttpGet("category/{categoryId}")]
        [Produces(typeof(IEnumerable<CategoryModel>))]
        public async Task<IActionResult> GetChildCategories(int categoryId)
        {
            var categories = await _ebaySearchRepository.GetChildCategories(categoryId).ConfigureAwait(false);

            return Ok(categories.Where(c => c.CategoryID != categoryId));
        }
    }
}
