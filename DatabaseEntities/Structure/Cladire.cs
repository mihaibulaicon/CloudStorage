﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Entities
{
    public class Cladire : BaseEntity
    {
        public string Nume { get; set; }
        public IEnumerable<Incapere> Incaperi { get; set; }
        public Locatie Locatie { get; set; }
    }
}