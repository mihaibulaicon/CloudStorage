using CloudStorage.Attributes;
using DatabaseEntities;
using RavenDatabase;
using RavenDatabase.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace CloudStorage.Controllers
{
     [TokenAuthorizationFilter(true)]
    public class FolderController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public FolderController() { }
        public FolderController(ICommandService commandService, IQueryService queryService)
        {
            CommandService = commandService;
            QueryService = queryService;
        }

        public HttpResponseMessage Post([FromBody]Folder value)
        {  
            CommandService.Execute(new SaveOrUpdateEntity<Folder>() { Entity = value });
            return new HttpResponseMessage(HttpStatusCode.Created);
        }
        public IEnumerable<Folder> Get(int id)
        {
            var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
            var tokenArray = authorizeToken.Split(':');
            var folders = QueryService.Execute<IEnumerable<Folder>>(new GetFoldersByUsernameAndType() { Username = tokenArray[0], FolderType = id });
            return folders;
        }
    }
}
