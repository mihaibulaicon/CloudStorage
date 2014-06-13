using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities
{
    public class Folder : BaseEntity
    {
        public string Name { get; set; }
        public int Count { get; set; }
        public string Username { get; set; }
        public int FolderType {get; set;}
    }
}
