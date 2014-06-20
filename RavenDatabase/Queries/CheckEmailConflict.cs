using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class CheckEmailConflict : IQueryDefinition<bool>
    {
        public string Email { get; set; }
        public string Id { get; set; }
        public bool Execute(IDocumentSession documentSession)
        {
            var user = documentSession.Load<Utilizator>(Id);
            if (user.Email == Email) return false;
            else
            {
                var userList = from utilizator in documentSession.Query<Utilizator>()
                               where utilizator.Email == Email
                               select utilizator;
                return userList.Any();
            }
        }
    }
}
