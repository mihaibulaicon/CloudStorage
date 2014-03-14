using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Data.Services.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudStorage.DatabaseEntities.Structure
{

    [DataServiceKey("Nume")]
    public class Birou : BaseEntity
    {
        public string Nume { get; set; }
        public string ServiciuId { get; set; }
        public string SectieId { get; set; }
    }
}
