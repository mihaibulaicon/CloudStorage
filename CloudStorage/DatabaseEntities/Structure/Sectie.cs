using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudStorage.DatabaseEntities.Entities;
using DatabaseEntities;
namespace CloudStorage.DatabaseEntities.Structure
{
    public class Sectie : BaseEntity
    {
        public string Nume { get; set; }
        public IEnumerable<Birou> Birouri { get; set; }
        public Serviciu Serviciu { get; set; }
    }
}
