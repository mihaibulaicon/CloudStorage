using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities
{
    public class Photo : BaseEntity
    {
        public string FileName { get; set; }
        public string UserName { get; set; }
        public string ImageType { get; set; }
        public string FolderId { get; set; }
    }
}
