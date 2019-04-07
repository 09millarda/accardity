using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Instabuy.Data;
using Instabuy.Data.Web;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Instabuy.Web.Controllers
{
    [Route("api/ebay")]
    [ApiController]
    [Produces("application/json")]
    public class EbayController : ControllerBase
    {
        private readonly IEbaySearchRepository _ebaySearchRepository;
        private ILogger<EbayController> _logger;

        public EbayController(IEbaySearchRepository ebaySearchRepository, ILogger<EbayController> logger)
        {
            _logger = logger;
            _ebaySearchRepository = ebaySearchRepository;
        }

        [HttpGet("history")]
        [Produces(typeof(IEnumerable<EbayItemModelNormalized>))]
        public async Task<IActionResult> GetFilterHistory(int categoryId, string filterString, string conditions, decimal? priceMin, decimal? priceMax, decimal? minFeedbackScore)
        {
            var historicalItems = await _ebaySearchRepository.GetHistory(DateTimeOffset.UtcNow.Date.AddDays(-90), categoryId, filterString, conditions.Split(',').Select(c => int.Parse(c)).ToArray(), priceMin, priceMax, minFeedbackScore).ConfigureAwait(false);

            return Ok(historicalItems);
        }

        [HttpGet("category/{categoryId}")]
        [Produces(typeof(IEnumerable<CategoryModel>))]
        public async Task<IActionResult> GetChildCategories(int categoryId)
        {
            _logger.LogInformation("TEST INSTABUY");
            var categories = await _ebaySearchRepository.GetChildCategories(categoryId).ConfigureAwait(false);

            return Ok(categories.Where(c => c.CategoryID != categoryId));
        }

        [HttpGet("getMultipleItems/{itemIds}")]
        public async Task<IActionResult> GetMultipleItems(string itemIds)
        {
            var ids = itemIds.Split(',');

            var items = await _ebaySearchRepository.GetMultipleItems(ids).ConfigureAwait(false);

            return Ok(items);
        }

        [HttpPost("getAspectHistograms/{categoryId}")]
        public async Task<IActionResult> GetAspectHistogramsByCategoryId([FromBody]AspectsGroupForm aspectGroup, int categoryId)
        {
            try
            {
                var aspectHistograms = await _ebaySearchRepository.GetAspectHistogramsByCategoryIdAndAspects(categoryId, aspectGroup.Aspects).ConfigureAwait(false);
                return Ok(aspectHistograms);
            } catch (InvalidOperationException e)
            {
                return BadRequest(e);
            }
        }
    }
}
