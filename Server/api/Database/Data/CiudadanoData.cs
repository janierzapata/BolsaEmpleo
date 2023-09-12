using System.Reflection.Metadata;
using System;
using api.Database;
using api.Database.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using api.Helpers.Struct;
using System.Data.Common;
using Api.Helpers.Struct;

namespace api.Database.Data
{
    public static class CiudadanoData
    {
        private static Connection cn = new Connection();

        public static Ciudadano setDataCiudadano(SqlDataReader reader)
        {
            var ciudadano = new Ciudadano();
            ciudadano.id = reader.GetInt32("id");
            ciudadano.numeroDocumento = reader.GetInt32("numero_documento");
            ciudadano.nombres = reader.GetString("nombres");
            ciudadano.apellidos = reader.GetString("apellidos");
            ciudadano.fechaNacimiento = reader.GetDateTime("fecha_nacimiento");
            ciudadano.profesion = reader.GetString("profesion");
            ciudadano.aspiracionSalarial = (float) reader.GetDouble("aspiracion_salarial");
            ciudadano.email = reader.GetString("e_mail");
            ciudadano.tipoDocumento = new TipoDocumento();
            ciudadano.tipoDocumento.id = reader.GetInt32("tipo_documento_id");
            ciudadano.tipoDocumento.tipo = reader.GetString("tipo");
            return ciudadano;
        }

        public static Response GetCiudadanos()
        {
            string msg = "Ciudadanos obtenidos con exito";
            var ciudadanos = new List<Ciudadano>();
            string query = "select * from ciudadano c join tipo_documento t on c.tipo_documento_id = t.id;";

            try {
                cn.Conectar();
                using (var reader = cn.selectQuery(query))
                {
                    while (reader.Read())
                    {
                        var ciudadano = setDataCiudadano(reader);
                        ciudadanos.Add(ciudadano);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"(GetCiudadanos) Error -> {ex}");
                msg = "Error al obtener a los ciudadanos ";
            }
            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = ciudadanos
            };
        }

        public static Response GetCiudadano(int numeroDocumento)
        {
            string msg = "Ciudadano obtenido correctamente";
            var ciudadano = new Ciudadano();
            string query = "select * from ciudadano c join tipo_documento t on c.tipo_documento_id = t.id where c.numero_documento = @numeroDocumento;";
            try {
                cn.Conectar();
                ObjParameter[] parameters = {new ObjParameter("numeroDocumento", numeroDocumento)};
                using(var reader = cn.selectQuery(query, parameters))
                {
                    if (reader.HasRows)
                    {
                        reader.Read();
                        ciudadano = setDataCiudadano(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"(GetCiudadano) Error -> {ex}");
                msg = "Error al obtener el ciudadano";
            }
            cn.Desconected();
            return new Response
            {
                msg = msg,
                data = ciudadano
            };
        }

        public static async Task<Response> AddCiudadano(Ciudadano ciudadano)
        {
            string msg = "Registro exitoso";
            string query = @"insert into ciudadano 
                             (
                                tipo_documento_id, 
                                numero_documento,  
                                nombres, 
                                apellidos,  
                                fecha_nacimiento,  
                                profesion,  
                                aspiracion_salarial,  
                                e_mail
                             )
                             values
                             (
                                @tipo_documento, 
                                @numero_documento, 
                                @nombres, 
                                @apellidos, 
                                @fecha_nacimiento, 
                                @profesion, 
                                @aspiracion_salarial, 
                                @e_mail
                             );
                             ";
            try
            {
                cn.Conectar();
                ObjParameter[] parameters =
                {
                    new ObjParameter("tipo_documento", ciudadano.tipoDocumento.id),
                    new ObjParameter("numero_documento", ciudadano.numeroDocumento),
                    new ObjParameter("nombres", ciudadano.nombres),
                    new ObjParameter("apellidos", ciudadano.apellidos),
                    new ObjParameter("fecha_nacimiento", ciudadano.fechaNacimiento),
                    new ObjParameter("profesion", ciudadano.profesion),
                    new ObjParameter("aspiracion_salarial", ciudadano.aspiracionSalarial),
                    new ObjParameter("e_mail", ciudadano.email),
                };

                await cn.modifyQuery(query, parameters);
            }
            catch(Exception e)
            {
                Console.WriteLine($"(AddCiudadano) Error -> {e}");
                msg = "Error, no se pudo realizar el registro";
            }
            
            cn.Desconected();
            
            return new Response
            {
                msg = msg,
                data = new object()
            };
        }

        public static async Task<Response> UpdateCiudadano(int identificacion, Ciudadano ciudadano)
        {
            string msg = "Actualizacion de datos exitoso";
            string query = @"UPDATE ciudadano
                             SET
                                tipo_documento_id = @tipo_documento,
                                nombres = @nombres,
                                apellidos = @apellidos,
                                fecha_nacimiento = @fecha_nacimiento,
                                profesion = @profesion,
                                aspiracion_salarial = @aspiracion_salarial
                             WHERE
                                numero_documento = @numero_documento;
                             ";
            try
            {
                cn.Conectar();
                ObjParameter[] parameters =
                {
                    new ObjParameter("tipo_documento", ciudadano.tipoDocumento.id),
                    new ObjParameter("nombres", ciudadano.nombres),
                    new ObjParameter("apellidos", ciudadano.apellidos),
                    new ObjParameter("fecha_nacimiento", ciudadano.fechaNacimiento),
                    new ObjParameter("profesion", ciudadano.profesion),
                    new ObjParameter("aspiracion_salarial", ciudadano.aspiracionSalarial),
                    new ObjParameter("numero_documento", identificacion),
                };
                await cn.modifyQuery(query, parameters);
            }
            catch (Exception e)
            {
                Console.WriteLine($"(AddCiudadano) Error -> {e}");
                msg = "Error, no se pudo actualizar la informacion // " + $" Error -> {e}";
            }

            cn.Desconected();

            return new Response
            {
                msg = msg,
                data = new object()
            };
        }

        public static async Task<Response> DaleteCiudadano(int numero_documento)
        {
            string msg = "Informacion eliminada con exitoso";
            string query = @"Delete from ciudadano where numero_documento = @numero_documento";

            try
            {
                cn.Conectar();
                ObjParameter[] parameters =
                {
                    new ObjParameter("numero_documento", numero_documento),
                };

                await cn.modifyQuery(query, parameters);
            }
            catch (Exception e)
            {
                Console.WriteLine($"(AddCiudadano) Error -> {e}");
                msg = "Error, no se pudo eliminar la informacion";
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