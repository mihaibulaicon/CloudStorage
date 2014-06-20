using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class GetDocumentsByUsernameAndFolder : IQueryDefinition<IEnumerable<Document>>
    {
        public string Username { get; set; }
        public string FolderId { get; set; }
        public IEnumerable<Document> Execute(IDocumentSession documentSession)
        {
            var documents = from document in documentSession.Query<Document>()
                            where document.UserName == Username
                         && document.FolderId == FolderId
                            select document;
            return documents;
        }
    }
}
