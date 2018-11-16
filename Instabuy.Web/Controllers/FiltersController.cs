using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Instabuy.Data;
using Instabuy.Web.Data;
using Microsoft.AspNetCore.Mvc;

namespace Instabuy.Web.Controllers
{
    [Route("api/filters")]
    [ApiController]
    [Produces("application/json")]
    public class FiltersController : Controller
    {
        private readonly IFiltersRepository _filtersRepository;

        public FiltersController(IFiltersRepository filtersRepository)
        {
            _filtersRepository = filtersRepository;
        }

        [HttpPost]
        [Produces(typeof(Filter))]
        public async Task<IActionResult> CreateFilter([FromBody]FilterPostBody body)
        {
            var filter = await _filtersRepository.Add(body.FilterName, body.Categories, body.Categories.Last(), body.Keywords, body.Conditions, body.Period).ConfigureAwait(false);

            return Ok(filter);
        }
    }
}