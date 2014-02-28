using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public class GetAllEntitiesOfType<T> : IQueryDefinition
    {

        public IQueryable Execute(IDocumentSession documentSession)
        {
            return
                from entity in documentSession.Query<T>()
                select entity;
        }
    }
}
