using Raven.Client;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudStorage.Services
{
    public class CommandService : ICommandService
    {
        public CommandService() { }
        public T Execute<T>(ICommandDefinition<T> commandDefinition)
        {
            var documentSession = DependencyResolver.Current.GetService<IDocumentSession>();
            return commandDefinition.Execute(documentSession);
        }
    }
}