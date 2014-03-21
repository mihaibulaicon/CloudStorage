using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudStorage.DatabaseEntities.Structure
{
    public class Cladire : BaseEntity
    {
        public string Nume { get; set; }
        public string LocalitateId { get; set; }
        public string LocatieId { get; set; }
    }
}
