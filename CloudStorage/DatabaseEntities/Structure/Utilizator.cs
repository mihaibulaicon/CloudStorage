using DatabaseEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CloudStorage.DatabaseEntities.Structure
{
    public class Utilizator : BaseEntity
    {
        public string RankId { get; set; }
        public string Nume { get; set; }
        public string Prenume { get; set; }
        public Birou Birou { get; set; }
        public bool EsteSef { get; set; }
    }
}
