using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseEntities.Structure;

namespace DatabaseEntities.Entities
{
    public class Material : BaseEntity
    {
        public TipStatie TipStatie { get; set; }
        public SubTipStatie SubTipStatie { get; set; }
        public String Model { get; set; }
        public string Denumire { get; set; }
        public UnitateMasura UnitateMasura { get; set; }
        public Clasificare Clasificare { get; set; }
        public Destinatie Destinatie { get; set; }
        public Categorie Categorie { get; set; }
        public NivelClasificare NivelClasificare { get; set; }
        public Localizare Localizare { get; set; }
        public Utilizator Utilizator { get; set; }
    }
}
