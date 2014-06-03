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
        [TokenAuthorizationFilter(false)]
        public bool Get(string userName, string password)
        {
            var isAuthorized = QueryService.Execute<bool>(new AuthenticateUser() { UserName = userName, Password = password });
            return isAuthorized;
        }

        // POST api/<controller>
        [TokenAuthorizationFilter(false)]
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