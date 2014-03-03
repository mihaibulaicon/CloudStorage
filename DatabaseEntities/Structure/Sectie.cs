using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Structure
{
    public class Sectie : BaseEntity
    {
        public string Nume { get; set; }
        public IEnumerable<Birou> Birouri { get; set; }
        public IEnumerable<Compartiment> Compartimente { get; set; }
        public Serviciu Serviciu { get; set; }
    }
}
