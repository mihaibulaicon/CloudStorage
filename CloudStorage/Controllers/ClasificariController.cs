﻿using CloudStorage.DatabaseEntities.Entities;
using CloudStorage.DatabaseEntities.Structure;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CloudStorage.Controllers
{
    public class ClasificariController : BaseController<Clasificare>
    {
        public ClasificariController() { }
        public ClasificariController(ICommandService commandService, IQueryService queryService)
            : base(commandService, queryService)
        {
        }
    }
}