using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class CheckEmailAndUserNameConflict : IQueryDefinition<bool>
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public bool Execute(IDocumentSession documentSession)
        {
            var userList = from utilizator in documentSession.Query<Utilizator>()
                           where utilizator.Email == Email || utilizator.Username == UserName
                           select utilizator;
            return userList.Any();
        }
    }
}
