using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public class DeleteEntity<T> : ICommandDefinition<string> where T : BaseEntity
    {
        public string Id { get; set; }
        public DeleteEntity() { }
        public string Execute(IDocumentSession documentSession)
        {
            var entity = documentSession.Load<T>(Id);
            documentSession.Delete<T>(entity);
            documentSession.SaveChanges();
            return string.Empty;
        }

    }
}
