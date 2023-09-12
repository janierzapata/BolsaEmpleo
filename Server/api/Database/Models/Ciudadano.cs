using System;
using api.Database.Models;


namespace api.Database.Models 
{
    public class Ciudadano 
    {
        public int id { get; set; }
        public TipoDocumento tipoDocumento { get; set; }
        public int numeroDocumento { get; set; }
        public string nombres { get; set; }
        public string apellidos { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public string profesion { get; set; }
        public float aspiracionSalarial { get; set; }
        public string email { get; set; }
    }
}