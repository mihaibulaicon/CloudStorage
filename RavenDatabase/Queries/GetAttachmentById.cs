using DatabaseEntities;
using Raven.Abstractions.Data;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class GetAttachmentById : IQueryDefinition<Attachment>
    {
        public string Id { get; set; }
        public Attachment Execute(IDocumentSession documentSession)
        {
            var documentStore = documentSession.Advanced.DocumentStore;
            Attachment attachment =
                documentStore.DatabaseCommands.GetAttachment(Id);
            return attachment;
        }
    }
}
