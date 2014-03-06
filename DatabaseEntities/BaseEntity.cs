using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data.Services.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseEntities
{
    
    public class BaseEntity
    {
        public string Id { get; set; }

        public void CopyProperties(object src)
        {
            foreach (PropertyDescriptor item in TypeDescriptor.GetProperties(src))
            {
                item.SetValue(this, item.GetValue(src));
            }
        }
    }
}
