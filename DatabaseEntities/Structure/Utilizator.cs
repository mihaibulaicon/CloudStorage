using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities.Structure
{
    public class Utilizator : BaseEntity
    {
        public string Rank { get; set; }
        public string Nume { get; set; }
        public string Prenume { get; set; }
        public Birou Birou { get; set; }
        public bool EsteSef { get; set; }
    }
}
