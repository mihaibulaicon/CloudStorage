using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class GetFoldersByUsernameAndType : IQueryDefinition<IEnumerable<Folder>>
    {
        public string Username { get; set; }
        public int FolderType { get; set; }
        public IEnumerable<Folder> Execute(IDocumentSession documentSession)
        {
            var folders = from folder in documentSession.Query<Folder>()
                          where folder.Username == Username
                                && folder.FolderType == FolderType
                          select folder;
            return folders;
        }
    }
}
