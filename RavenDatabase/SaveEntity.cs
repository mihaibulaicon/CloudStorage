using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public class SaveEntity<T> : ICommandDefinition
    {
        public T Entity { get; set; }
        public SaveEntity() {}
        public void Execute(IDocumentSession documentSession)
        {
            documentSession.Store(Entity);
            documentSession.SaveChanges();
        }
    }
}
