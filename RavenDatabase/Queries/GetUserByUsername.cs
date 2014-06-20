﻿using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class GetUserByUsername : IQueryDefinition<Utilizator>
    {
        public string UserName { get; set; }
        public Utilizator Execute(IDocumentSession documentSession)
        {
            var userList = from utilizator in documentSession.Query<Utilizator>()
                           where utilizator.Username == UserName
                           select utilizator;
            return userList.First();
        }
    }
}
