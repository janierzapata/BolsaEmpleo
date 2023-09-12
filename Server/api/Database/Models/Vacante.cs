using api.Database.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Database.Models
{
    public class Vacante
    {
        public int id { get; set; }
        public string codigo { get; set; }
        public string cargo { get; set; }
        public string descripcion { get; set; }
        public string empresa { get; set; }
        public float salario { get; set; }
        public string estado { get; set; }
        public Ciudadano ciudadano { get; set; }
    }
}