using DatabaseEntities;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CloudStorage.Controllers
{
    public class PhotosController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public PhotosController() { }
        public PhotosController(ICommandService commandService, IQueryService queryService)
        {
            CommandService = commandService;
            QueryService = queryService;
        }
        public HttpResponseMessage Post()
        {
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    //var filePath = HttpContext.Current.Server.MapPath("~/" + postedFile.FileName);
                   // postedFile.SaveAs(filePath);
                    var savedId = CommandService.Execute<string>(new SaveOrUpdateEntity<Photo>() { Entity = new Photo() { FileName = postedFile.FileName } });
                    CommandService.Execute<string>(new SaveAtachment() { Id= savedId, File = postedFile.InputStream });
                }
                result = Request.CreateResponse(HttpStatusCode.Created);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            return result;
        }
    }
}
