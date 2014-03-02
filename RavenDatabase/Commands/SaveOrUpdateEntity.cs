using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public class SaveOrUpdateEntity<T> : ICommandDefinition where T: BaseEntity
    {
        public T Entity { get; set; }
        public SaveOrUpdateEntity() {}
        public void Execute(IDocumentSession documentSession)
        {
            if (Entity.Id != null)
            {
                T entity = documentSession.Load<T>(Entity.Id);
                entity.CopyProperties(Entity);
            }
            else
                documentSession.Store(Entity);
            documentSession.SaveChanges();
        }
       
    }
}
