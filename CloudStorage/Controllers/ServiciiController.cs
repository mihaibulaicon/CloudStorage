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
    public class ServiciiController : BaseController<Serviciu>
    {
        public ServiciiController() { }
        public ServiciiController(ICommandService commandService, IQueryService queryService)
            : base(commandService, queryService)
        {
        }
    }
}
