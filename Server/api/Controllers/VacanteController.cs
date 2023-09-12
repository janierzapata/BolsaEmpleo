using Api.Database.Data;
using Api.Helpers.Struct;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VacanteController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<Response>> GetVacantes()
        {
            var resp = VacanteData.GetVacantes();
            Console.WriteLine("esta es la data ==> " + resp);
            return await VacanteData.GetVacantes();
        }

        [HttpGet]
        public ActionResult<Response> GetVacante(string codigo)
        {
            var resp = VacanteData.GetVacante(codigo);
            Console.WriteLine("esta es la data ==> " +resp);
            return VacanteData.GetVacante(codigo);
        }

        [HttpGet]
        public ActionResult<Response> GetVacanteUsuario(int identificacion)
        {
            return VacanteData.GetVacanteUsuario(identificacion);
        }

        [HttpPut]
        public async Task<ActionResult<Response>> postularCiudadano(string codigoVacante, int numeroIdentificacion)
        {
            if (VacanteData.ValidarVacante(codigoVacante).data == null)
                return new Response
                {
                    msg = "Ya existe una postulacion",
                    data = null
                };

            if(VacanteData.GetVacanteUsuario(numeroIdentificacion).data != null)
                return new Response
                {
                    msg = "El ciudadano ya esta postulado en una vacante",
                    data = null
                };

            return await VacanteData.postularAVacante(codigoVacante, numeroIdentificacion);
            
        }

        [HttpDelete]
        public async Task<ActionResult<Response>> cencelarPostulacion(string codigoVacante, int numeroIdentificacion)
        {
            if (VacanteData.GetVacanteUsuario(numeroIdentificacion).data == null)
                return new Response
                {
                    msg = "El ciudadano no tiene vacantes",
                    data = null
                };
            
            return await VacanteData.cancelarPostularAVacante(codigoVacante, numeroIdentificacion);
        }

    }
}
