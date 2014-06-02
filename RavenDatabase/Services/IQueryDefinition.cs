using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public interface IQueryDefinition<T>
    {
        T Execute(IDocumentSession documentSession);
    }
}
