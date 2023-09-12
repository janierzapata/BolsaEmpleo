using api.Database.Models;
using Api.Database.Data;
using Api.Helpers.Struct;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TipoDocumentoController : Controller
    {
        [HttpGet]
        public async Task<ActionResult<Response>> GetTipoDocumentos()
        {
            return await TipoDocumentoData.GetTipoDocumentos();
        }

        [HttpGet]
        public ActionResult<Response> GetTipoDocumento(int id)
        {
            return TipoDocumentoData.GetTipoDocumento(id);
        }

    }
}
