using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseEntities;
using CloudStorage.DatabaseEntities.Structure;
using System.Data.Services.Common;

namespace CloudStorage.DatabaseEntities.Entities
{
    [DataServiceKey("Denumire")]
    public class Material : BaseEntity
    {
        public string Denumire { get; set; }
        
        public string TipStatieId { get; set; }
        public string SubTipStatieId { get; set; }
        public string FirmaId { get; set; }
        public string ModelId { get; set; }
        
        public string UnitateMasuraId { get; set; }
        public string NumarInventar { get; set; }
        public string ClasificareId { get; set; }
        public string Serie { get; set; }
        public string DenumireRetea { get; set; }
        
        public string NumarDS { get; set; }
        public string NivelClasificareId { get; set; }
        
        public string FirmahddId { get; set; }
        public string ModelHDDId { get; set; }
        public string SeriaHDD { get; set; }
        public int CapacitateHDD { get; set; }

        public string ServiciuId { get; set; }
        public string SectieId { get; set; }
        public string BirouId { get; set; }
        public string UtilizatorId { get; set; }

        public string LocalitateId { get; set; }
        public string LocatieId { get; set; }
        public string CladireId { get; set; }
        public string IncapereId { get; set; }

        public string DestinatieId { get; set; }
        public string Observatii { get; set; }
        public string CategorieId { get; set; }
        public int Cantitate { get; set; }

        public string Telefon { get; set; }
    }
}
