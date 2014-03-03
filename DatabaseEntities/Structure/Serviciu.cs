using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Structure
{
    public class Serviciu: BaseEntity
    {
        public string Name { get; set; }
        public IEnumerable<Sectie> Sectii { get; set; }
    }
}
