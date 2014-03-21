using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudStorage.DatabaseEntities.Entities
{
    public class SubTipStatie :BaseEntity
    {
        public string Nume { get; set; }
        public string TipStatieId { get; set; }
    }
}
