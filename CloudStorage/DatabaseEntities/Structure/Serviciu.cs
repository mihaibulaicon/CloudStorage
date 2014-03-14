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
    public class Serviciu: BaseEntity
    {
        public string Nume { get; set; }
    }
}
