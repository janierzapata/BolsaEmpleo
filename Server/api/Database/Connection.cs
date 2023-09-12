using System;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Data.SqlClient;
using api.Helpers.Struct;
using System.Threading.Tasks;

namespace api.Database
{
    public class Connection
    {
        private static string connectionString = new ConfigurationBuilder().SetBasePath(
                Directory.GetCurrentDirectory()
            ).AddJsonFile(
                "appsettings.json"
            ).Build().GetConnectionString("DefaultConnection"); 

        private SqlConnection conn = new SqlConnection(connectionString); 

        public SqlConnection Conn
        {
            get
            {
                return conn;
            }
        }

        public bool Conectar()
        {
            try
            {
                conn.Open();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error conexion --> " + ex.Message);
                return false;
            }

        }

        public void Desconected()
        {
            conn.Close();
        }

        private SqlCommand queryCommand(string query, ObjParameter[] parameters = null)
        {
            SqlCommand command = new SqlCommand(query, conn);
            if(parameters != null)
            {
                foreach (var parameter in parameters)
                {
                    command.Parameters.AddWithValue(parameter.ParameterName, parameter.ParameterValue);
                }
            }
            return command;
        }

        public SqlDataReader selectQuery(string query, ObjParameter[] parameters = null)	
        {
            SqlCommand command = queryCommand(query, parameters);
            return command.ExecuteReader();
        }

        public async Task<SqlDataReader> modifyQuery(string query, ObjParameter[] parameters = null)
        {
            SqlCommand command = queryCommand(query, parameters);
            return await command.ExecuteReaderAsync();
        }
        
    }
}
