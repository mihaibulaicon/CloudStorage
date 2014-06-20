using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities
{
    public class Document : BaseEntity
    {
        public string FileName { get; set; }
        public string UserName { get; set; }
        public string DocumentType { get; set; }

        public string Type { get; set; }
        public string FolderId { get; set; }
    }
}
