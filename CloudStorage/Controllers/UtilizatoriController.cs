using DatabaseEntities;
using RavenDatabase;
using RavenDatabase.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CloudStorage.Attributes;
namespace CloudStorage.Controllers
{
    [TokenAuthorizationFilter(true)]
    public class UtilizatoriController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public UtilizatoriController() { }
        public UtilizatoriController(ICommandService commandService, IQueryService queryService)
        {
            CommandService = commandService;
            QueryService = queryService;
        }
        public string Get(string id)
        {
            return "value";
        }

        // POST api/<controller>
        public HttpResponseMessage Post([FromBody]Utilizator value)
        {
            var userExistent = QueryService.Execute<bool>(new CheckEmailAndUserNameConflict() { Email = value.Email, UserName = value.Username });
            if (userExistent)
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            else
                CommandService.Execute(new SaveOrUpdateEntity<Utilizator>() { Entity = value });

            return new HttpResponseMessage(HttpStatusCode.Created);
        }
     
    }
}