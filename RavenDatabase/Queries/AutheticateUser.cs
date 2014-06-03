using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class AuthenticateUser : IQueryDefinition<bool>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Execute(IDocumentSession documentSession)
        {
            var userList = from utilizator in documentSession.Query<Utilizator>()
                           where utilizator.Password == Password && utilizator.Username == UserName
                           select utilizator;
            return userList.Any();
        }
    }
}
