using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Entities
{
    public class Incapere : BaseEntity
    {
        public string Nume { get; set; }
        public Cladire Cladire { get; set; }
    }
}
