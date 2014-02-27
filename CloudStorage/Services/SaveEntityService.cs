using Raven.Client;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudStorage.Services
{
    public class SaveEntityService : ICommandService
    {
        public void Execute(ICommandDefinition commandDefinition)
        {
            var documentSession = DependencyResolver.Current.GetService<IDocumentSession>();
            commandDefinition.Execute(documentSession);
        }
    }
}