using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudStorage.DatabaseEntities.Structure
{
    public class Birou : BaseEntity
    {
        public string Nume { get; set; }
        public string SectieId { get; set; }
    }
}
