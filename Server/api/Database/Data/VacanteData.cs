using api.Database;
using api.Database.Data;
using api.Database.Models;
using api.Helpers.Struct;
using Api.Helpers.Struct;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Api.Database.Data
{
    public static class VacanteData
    {
        private static Connection cn = new Connection();

        public static Vacante setVacante(SqlDataReader reader)
        {
            var vacante = new Vacante()
            {
                id = reader.GetInt32("id"),
                codigo = reader.GetString("codigo"),
                cargo = reader.GetString("cargo"),
                descripcion = reader.GetString("descripcion"),
                empresa = reader.GetString("empresa"),
                salario = (float)reader.GetDouble("salario"),
                estado = reader.GetString("estado"),
                ciudadano = new Ciudadano()
            };

            int ciudadano_id = reader.GetInt32("ciudadano_id");
            if (ciudadano_id > 0) vacante.ciudadano = (Ciudadano) CiudadanoData.GetCiudadano(ciudadano_id).data;

            return vacante;
        }

        public static async Task<Response> GetVacantes()
        {
            string msg = "Vacantes obtenidas con exito";
            var vacantes = new List<Vacante>();
            string query = "select * from vacante";

            try
            {
                cn.Conectar();
                using(var reader = cn.selectQuery(query))
                {
                    while (await reader.ReadAsync())
                    {
                        var vacante = setVacante(reader);
                        vacantes.Add(vacante);
                    }
                }
            }
            catch(Exception e)
            {
                Console.WriteLine($"(GetVacantes) Error -> {e}");
                msg = "Ha ocurrido un error al obtener las vacantes";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = vacantes
            };
        }

        public static Response GetVacante(string codigo)
        {
            string msg = "Vacante obtenida con exito";
            var vacante = new Vacante();
            string query = "select * from vacante v where v.codigo = @codigo";

            try
            {
                cn.Conectar();
                ObjParameter[] parameters = { new ObjParameter("codigo", codigo) };
                using (var reader = cn.selectQuery(query, parameters))
                {
                    if (reader.HasRows)
                    {
                        reader.Read();
                        vacante = setVacante(reader);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"(GetVacantes) Error -> {e}");
                msg = "Ha ocurrido un error al obtener las vacantes";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = vacante
            };
        }

        public static Response ValidarVacante(string codigo)
        {
            string msg = "Vacante obtenida con exito";
            Vacante vacante = null;
            string query = "select * from vacante v where v.codigo = @codigo and estado = @estado";

            try
            {
                cn.Conectar();
                ObjParameter[] parameters = { new ObjParameter("codigo", codigo), new ObjParameter("estado", "libre") };
                using (var reader = cn.selectQuery(query, parameters))
                {
                    if (reader.HasRows)
                    {
                        reader.Read();
                        vacante = setVacante(reader);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"(GetVacantes) Error -> {e}");
                msg = "Ha ocurrido un error al obtener las vacantes";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = vacante
            };
        }


        public static Response GetVacanteUsuario(int identificacion)
        {
            string msg = "No existe vacante relacionada al ciudadano";
            Vacante vacante = null;
            string query = "select * from vacante v where v.ciudadano_id = @identificacion";

            try
            {
                cn.Conectar();
                ObjParameter[] parameters = { new ObjParameter("identificacion", identificacion) };
                using (var reader = cn.selectQuery(query, parameters))
                {
                    if (reader.HasRows)
                    {
                        reader.Read();
                        vacante = setVacante(reader);
                        msg = "Vacante obtenida con exito";
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"(GetVacantes) Error -> {e}");
                msg = "Ha ocurrido un error al obtener las vacantes";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = vacante
            };
        }

        public static async Task<Response> postularAVacante(string vacante, int ciudadano)
        {
            string msg = "Postulacion exitosa";
            string query = "update vacante set estado = @estado, ciudadano_id = @numero_identificacion where codigo = @codigo";

            try
            {
                cn.Conectar();
                ObjParameter[] parameters = 
                {
                    new ObjParameter("numero_identificacion", ciudadano),
                    new ObjParameter("codigo", vacante),
                    new ObjParameter("estado", "no disponible")
                };
                await cn.modifyQuery(query, parameters);
            }
            catch (Exception e)
            {
                Console.WriteLine($"(GetVacantes) Error -> {e}");
                msg = "Ha ocurrido al momento de la postulacion";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = new object()
            };
        }

        public static async Task<Response> cancelarPostularAVacante(string vacante, int ciudadano)
        {
            string msg = "Cancelacion exitosa";
            string query = "update vacante set estado = @estado, ciudadano_id = 0 where codigo = @codigo and ciudadano_id = @numero_identificacion";

            try
            {
                cn.Conectar();
                ObjParameter[] parameters =
                {
                    new ObjParameter("numero_identificacion", ciudadano),
                    new ObjParameter("codigo", vacante),
                    new ObjParameter("estado", "libre")
                };
                await cn.modifyQuery(query, parameters);
            }
            catch (Exception e)
            {
                Console.WriteLine($"(GetVacantes) Error -> {e}");
                msg = "Ha ocurrido al momento de la postulacion";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = new object()
            };
        }

    }
}
