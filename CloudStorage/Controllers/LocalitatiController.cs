using CloudStorage.DatabaseEntities.Entities;
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
    public class LocalitatiController : BaseController<Localitate>
    {
        public LocalitatiController() { }
        public LocalitatiController(ICommandService commandService, IQueryService queryService)
            : base(commandService, queryService)
        {
        }
    }
}
