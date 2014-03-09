using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudStorage.DatabaseEntities.Entities;
using DatabaseEntities;
using System.Data.Services.Common;
namespace CloudStorage.DatabaseEntities.Structure
{
    [DataServiceKey("Nume")]
    public class Sectie : BaseEntity
    {
        public string Nume { get; set; }
        public string ServiciuId { get; set; }
    }
}
