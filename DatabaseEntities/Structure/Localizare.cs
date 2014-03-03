using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Entities
{
    public class Localizare : BaseEntity
    {
        public Localitate Localitate { get; set; }
        public Locatie Locatie { get; set; }
        public Cladire Cladire { get; set; }
        public Incapere Incapere { get; set; }
    }
}
