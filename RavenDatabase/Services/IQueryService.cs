﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase
{
    public interface IQueryService
    {
        IQueryable Execute(IQueryDefinition queryDefinition);
    }
}