using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudStorage.DatabaseEntities.Entities
{
    public class Model : BaseEntity
    {
        public string Nume { get; set; }
        public string FirmaId { get; set; }
    }
}