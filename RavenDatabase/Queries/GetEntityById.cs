using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseEntities;
namespace RavenDatabase
{
    public class GetEntityById<T> : IQueryDefinition<T> where T : BaseEntity
    {
        public string Id { get; set; }
        public T Execute(IDocumentSession documentSession)
        {
            return documentSession.Load<T>(Id);
        }
    }
}
