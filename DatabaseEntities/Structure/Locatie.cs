using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Entities
{
    public class Locatie : BaseEntity
    {
        public string Nume { get; set; }
        public IEnumerable<Cladire> Cladiri { get; set; }
        public Localitate Localitate { get; set; }
    }
}
