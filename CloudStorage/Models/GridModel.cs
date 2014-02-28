using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using DatabaseEntities;

namespace CloudStorage.Models
{
    public class GridModel
    {
        public IEnumerable<Utilizator> Utilizatori { get; set; }
    }
}