using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DatabaseEntities;
namespace RavenDatabase
{
    public class GetEntityById<T> : IQueryDefinition where T : BaseEntity
    {
        public string Id { get; set; }
        public IQueryable Execute(IDocumentSession documentSession)
        {
            return
                from entity in documentSession.Query<T>()
                where entity.Id == Id
                select entity;
        }
    }
}
