using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Instabuy.Data.Sql
{
    internal class SqlHistoricalItemInfoRepository : SqlBaseContext, IHistoricalItemInfoRepository
    {
        public SqlHistoricalItemInfoRepository(InstabuyDbContext context) : base(context) { }

        public async Task<IEnumerable<HistoricalEbayItemInfo>> AddRange(long filterId, IEnumerable<HistoricalEbayItemInfo> items)
        {
            var filter = await Context.Filters.FirstOrDefaultAsync(f => f.FilterId == filterId).ConfigureAwait(false);
            var historicalItems = items.Select(i => new Models.HistoricalItemInfo
            {
                BuyItNowAvailable = i.BuyItNowAvailable,
                Country = i.Country,
                ListingEnd = i.ListingEnd,
                Filter = filter,
                Location = i.Location,
                ReturnsAccepted = i.ReturnsAccepted.GetValueOrDefault(),
                SellPrice = i.SellPrice,
                ShippingCost = i.ShippingCost,
                ListingStart = i.ListingStart,
                Title = i.Title,
                TopRatedListing = i.TopRatedListing.GetValueOrDefault(),
                CategoryName = i.CategoryName,
                Condition = i.Condition,
                EbayProductId = i.EbayProductId,
                GalleryUrl = i.GalleryUrl
            }).ToList();

            Context.ChangeTracker.AutoDetectChangesEnabled = false;

            var segmentedItems = new List<IEnumerable<Models.HistoricalItemInfo>>();

            for (int i = 0; i < historicalItems.Count(); i += 100)
            {
                segmentedItems.Add(historicalItems.GetRange(i, Math.Min(100, historicalItems.Count() - i)));
            }

            for (int i = 0; i < segmentedItems.Count; i++)
            {
                await Context.HistoricalItems.AddRangeAsync(segmentedItems[i]).ConfigureAwait(false);
                Context.ChangeTracker.DetectChanges();
                await Context.SaveChangesAsync().ConfigureAwait(false);
            }

            Context.ChangeTracker.AutoDetectChangesEnabled = true;

            return historicalItems.Select(i => new HistoricalEbayItemInfo
            {
                BuyItNowAvailable = i.BuyItNowAvailable,
                Country = i.Country,
                ListingEnd = i.ListingEnd,
                Location = i.Location,
                ReturnsAccepted = i.ReturnsAccepted.GetValueOrDefault(),
                SellPrice = i.SellPrice,
                ShippingCost = i.ShippingCost,
                ListingStart = i.ListingStart,
                Title = i.Title,
                TopRatedListing = i.TopRatedListing.GetValueOrDefault(),
                CategoryName = i.CategoryName,
                Condition = i.Condition,
                EbayProductId = i.EbayProductId,
                GalleryUrl = i.GalleryUrl,
                ItemId = i.ItemId
            });
        }

        public async Task<IEnumerable<HistoricalEbayItemInfo>> GetRelated(long filterId)
        {
            var items = await Context.HistoricalItems.Where(i => i.Filter.FilterId == filterId).OrderByDescending(i => i.ListingEnd).ToListAsync().ConfigureAwait(false);

            return items.Select(i => new HistoricalEbayItemInfo
            {
                BuyItNowAvailable = i.BuyItNowAvailable,
                Country = i.Country,
                ListingEnd = i.ListingEnd,
                Location = i.Location,
                ReturnsAccepted = i.ReturnsAccepted.GetValueOrDefault(),
                SellPrice = i.SellPrice,
                ShippingCost = i.ShippingCost,
                ListingStart = i.ListingStart,
                Title = i.Title,
                TopRatedListing = i.TopRatedListing.GetValueOrDefault(),
                CategoryName = i.CategoryName,
                Condition = i.Condition,
                EbayProductId = i.EbayProductId,
                GalleryUrl = i.GalleryUrl,
                ItemId = i.ItemId
            });
        }

        public async Task RemoveRelated(long filterId)
        {
            var items = await Context.HistoricalItems.Where(i => i.Filter.FilterId == filterId).ToListAsync().ConfigureAwait(false);

            Context.HistoricalItems.RemoveRange(items);
            await Context.SaveChangesAsync().ConfigureAwait(false);
        }
    }
}
