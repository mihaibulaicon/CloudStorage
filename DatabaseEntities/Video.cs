using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities
{
    public class Video : BaseEntity
    {
        public string FileName { get; set; }
        public string UserName { get; set; }
        public string VideoType { get; set; }
        public string FolderId { get; set; }
    }
}
