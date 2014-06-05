using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public interface ICommandService
    {
        T Execute<T>(ICommandDefinition<T> commandDefinition);
    }
}
