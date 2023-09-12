using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using api.Database.Models;
using api.Database.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Api.Helpers.Struct;
using System.Runtime.InteropServices;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CiudadanoController : Controller
    {
        private readonly ILogger<CiudadanoController> _logger;

        public CiudadanoController(ILogger<CiudadanoController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<Response> GetCiudadanos()
        {
            return CiudadanoData.GetCiudadanos();
        }

        [HttpGet]
        public ActionResult<Response> GetCiudadano(int identificaion)
        {
            return CiudadanoData.GetCiudadano(identificaion);
        }

        [HttpPost]
        public async Task<ActionResult<Response>> registrar([FromBody] Ciudadano ciudadano)
        {
            return await CiudadanoData.AddCiudadano(ciudadano);
        }

        [HttpPut]
        public async Task<ActionResult<Response>> actualizar(int identificacion, [FromBody] Ciudadano ciudadano)
        {
            return await CiudadanoData.UpdateCiudadano(identificacion, ciudadano);
        }

        [HttpDelete]
        public async Task<ActionResult<Response>> eliminar(int identificacion)
        {
            return await CiudadanoData.DaleteCiudadano(identificacion);
        }
    }
}