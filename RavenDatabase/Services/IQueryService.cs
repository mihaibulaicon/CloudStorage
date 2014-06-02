using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public interface IQueryService
    {
        T Execute<T>(IQueryDefinition<T> queryDefinition);
    }
}
