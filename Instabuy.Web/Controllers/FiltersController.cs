using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Instabuy.Data;
using Instabuy.Data.Web;
using Microsoft.AspNetCore.Mvc;

namespace Instabuy.Web.Controllers
{
    [Route("api/filters")]
    [ApiController]
    [Produces("application/json")]
    public class FiltersController : Controller
    {
        private readonly IFiltersRepository _filtersRepository;
        private readonly IEbaySearchRepository _ebaySearchRepository;
        private readonly IHistoricalItemInfoRepository _historicalItemInfoRepository;

        public FiltersController(IFiltersRepository filtersRepository, IEbaySearchRepository ebaySearchRepository, IHistoricalItemInfoRepository historicalItemInfoRepository)
        {
            _filtersRepository = filtersRepository;
            _historicalItemInfoRepository = historicalItemInfoRepository;
            _ebaySearchRepository = ebaySearchRepository;
        }

        [HttpPost]
        [Produces(typeof(Filter))]
        public async Task<IActionResult> CreateFilter([FromBody]HttpFilter body)
        {
            if (await _filtersRepository.Get(body.FilterName).ConfigureAwait(false) != null) return BadRequest($"A filter with name '{body.FilterName}' already exists");

            var filter = await _filtersRepository.Add(body.FilterName, body.CategoryId, body.Keywords, body.Conditions, body.PriceMin, body.PriceMax, body.UserFeedbackMin).ConfigureAwait(false);

            var filterString = body.Keywords.Replace(' ', '+');
            var historicalItems = await _ebaySearchRepository.GetHistory(DateTimeOffset.UtcNow.Date.AddDays(-90), body.CategoryId, filterString, body.Conditions, body.PriceMin, body.PriceMax, body.UserFeedbackMin).ConfigureAwait(false);

            var thinItems = historicalItems.Select(i => new HistoricalEbayItemInfo
            {
                Country = i.Country ?? "",
                Location = i.Location ?? "",
                Title = i.Title ?? "",
                TopRatedListing = i.TopRatedListing,
                ReturnsAccepted = i.ReturnsAccepted,
                ShippingCost = i.ShippingInfo.ShippingServiceCost != null ? i.ShippingInfo.ShippingServiceCost.Value.Value : 0,
                SellPrice = i.SellingStatus.ConvertedCurrentPrice.Value.Value,
                ListingStart = i.ListingInfo.StartTime.Value,
                ListingEnd = i.ListingInfo.EndTime.Value,
                BuyItNowAvailable = i.ListingInfo.BuyItNowAvailable.Value,
                CategoryName = i.PrimaryCategory.CategoryName,
                Condition = i.Condition.ConditionDisplayName,
                EbayProductId = i.ProductId != null ? i.ProductId.Value : "",
                GalleryUrl = i.GalleryUrl
            });

            var items = await _historicalItemInfoRepository.AddRange(filter.FilterId, thinItems).ConfigureAwait(false);

            return Ok(new FullFilter
            {
                Filter = filter,
                HistoricalItems = items
            });
        }

        [HttpGet]
        [Produces(typeof(IEnumerable<Filter>))]
        public async Task<IActionResult> Get()
        {
            return Ok(await _filtersRepository.Get().ConfigureAwait(false));
        }

        [HttpGet("{filterId}")]
        [Produces(typeof(FullFilter))]
        public async Task<IActionResult> Get(long filterId)
        {
            var filter = await _filtersRepository.Get(filterId).ConfigureAwait(false);

            if (filter == null) return BadRequest($"Filter with if {filterId} does not exist");

            var historicalItems = await _historicalItemInfoRepository.GetRelated(filter.FilterId).ConfigureAwait(false);

            return Ok(new FullFilter
            {
                Filter = filter,
                HistoricalItems = historicalItems
            });
        }

        [HttpPut]
        [Produces(typeof(Filter))]
        public async Task<IActionResult> UpdateFilter([FromBody]HttpFilter body)
        {
            if (await _filtersRepository.Get(body.FilterId).ConfigureAwait(false) == null) return BadRequest($"A filter with filterId {body.FilterId} does not exist");

            var filter = await _filtersRepository.Update(body.FilterId, body.FilterName, body.CategoryId, body.Keywords, body.Conditions, body.Active, body.PriceMin, body.PriceMax, body.UserFeedbackMin).ConfigureAwait(false);

            return Ok(filter);
        }

        [HttpDelete("{filterId}")]
        public async Task<IActionResult> DeleteFilter(long filterId)
        {
            if (await _filtersRepository.Get(filterId).ConfigureAwait(false) == null) return BadRequest($"A filter with filterId {filterId} does not exist");

            await _historicalItemInfoRepository.RemoveRelated(filterId).ConfigureAwait(false);
            await _filtersRepository.Delete(filterId).ConfigureAwait(false);

            return Ok();
        }
    }
}