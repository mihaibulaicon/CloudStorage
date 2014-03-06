using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudStorage.DatabaseEntities.Structure
{
    public class Incapere : BaseEntity
    {
        public string Nume { get; set; }
        public Cladire Cladire { get; set; }
    }
}
