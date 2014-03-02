using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities
{
    public class Utilizator : BaseEntity
    {
        public string Nume { get; set; }
        public string Prenume { get; set; }
    }
}
