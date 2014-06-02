using Raven.Client;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudStorage.Services
{
    public class QueryService : IQueryService
    {
        public T Execute<T>(IQueryDefinition<T> queryDefinition)
        {
            var documentSession = DependencyResolver.Current.GetService<IDocumentSession>();
            return queryDefinition.Execute(documentSession);
        }
    }
}