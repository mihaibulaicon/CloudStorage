using DatabaseEntities;
using Raven.Client;
using Raven.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public class SaveAtachment : ICommandDefinition<string>
    {
        public string Id { get; set; }
        public Stream File { get; set; }
        public SaveAtachment() { }
        public string Execute(IDocumentSession documentSession)
        {
            var documentStore = documentSession.Advanced.DocumentStore;
            documentStore.DatabaseCommands.PutAttachment(Id, null, File,
                                                         new RavenJObject { { "Description", "Whatever" } });
            return string.Empty;
        }

    }
}
