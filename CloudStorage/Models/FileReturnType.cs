using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CloudStorage.Models
{
    public class FileReturnType
    {

        public string Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string IconType { get; set; }
        public byte[] ByteArray { get; set; }
    }

}