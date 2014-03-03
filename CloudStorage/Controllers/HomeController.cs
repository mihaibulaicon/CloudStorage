using DatabaseEntities.Structure;
using Raven.Client;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudStorage.Controllers
{
    public class HomeController : Controller
    {

        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }

        public HomeController() { }
        public HomeController(ICommandService commandService, IQueryService queryService)
        {
            CommandService = commandService;
            QueryService = queryService;
        }

        public ActionResult Index()
        {
            return View();
        }
    }
}
