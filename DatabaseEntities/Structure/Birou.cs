﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Structure
{
    public class Birou : BaseEntity
    {
        public string Nume { get; set; }
        public IEnumerable<Utilizator> Utilizatori { get;  set; }
        public Sectie Sectie { get; set; }
    }
}