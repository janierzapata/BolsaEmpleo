using api.Database;
using api.Database.Models;
using api.Helpers.Struct;
using Api.Helpers.Struct;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Api.Database.Data
{
    public static class TipoDocumentoData
    {
        private static Connection cn = new Connection();

        public static async Task<Response> GetTipoDocumentos()
        {
            string msg = "Tipos de documentos obtenidos con exito";
            var tipoDocuemntos = new List<TipoDocumento>();
            string query = "select * from tipo_documento";
            try
            {
                cn.Conectar();
                using(var reader = cn.selectQuery(query))
                {
                    while(await reader.ReadAsync())
                    {
                        var tipoDocumento = new TipoDocumento()
                        {
                            id = reader.GetInt32("id"),
                            tipo = reader.GetString("tipo")
                        };
                        tipoDocuemntos.Add(tipoDocumento);
                    }
                }
            }
            catch(Exception e)
            {
                Console.WriteLine($"(TipoDocumentos) Error -> {e}");
                msg = "Error al obtener los tipos de documentos";
            }
            cn.Desconected();
            return new Response
            {
                msg = msg,
                data = tipoDocuemntos
            };
        }

        public static Response GetTipoDocumento(int id)
        {
            string msg = "Tipo de documento obtenido con exito";
            var tipoDocumento = new TipoDocumento();
            string query = "select * from tipo_documento t where t.id = @id";
            try
            {
                cn.Conectar();
                ObjParameter[] parameters = { new ObjParameter("id", id) };
                using (var reader = cn.selectQuery(query, parameters))
                {
                    if (reader.HasRows)
                    {
                        reader.Read();
                        tipoDocumento.id = reader.GetInt32("id");
                        tipoDocumento.tipo = reader.GetString("tipo");
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine($"(TipoDocumento) Error -> {e}");
                msg = "Error al obtener el tipo de documento // " + $"Error -> {e}";
            }
            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = tipoDocumento
            };
        }

    }
}
