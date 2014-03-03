using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseEntities;
using DatabaseEntities.Structure;

namespace CloudStorage.Models
{
    public class GridModel
    {
        public IEnumerable<Utilizator> Utilizatori { get; set; }
    }
}