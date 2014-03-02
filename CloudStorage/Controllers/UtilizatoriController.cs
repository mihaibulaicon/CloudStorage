using DatabaseEntities;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CloudStorage.Controllers
{
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


        // GET api/<controller>
        public IQueryable<Utilizator> Get()
        {
            var utilizatori = QueryService.Execute(new GetAllEntitiesOfType<Utilizator>());
            return utilizatori as IQueryable<Utilizator>;
        }

        // GET api/<controller>/5
        public string Get(string id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]Utilizator value)
        {
        }
        
        // PUT api/<controller>/5
        [HttpPut]
        public void Put(IEnumerable<Utilizator> utilizatori)
        {
            foreach(var utilizator in utilizatori)
               CommandService.Execute(new SaveOrUpdateEntity<Utilizator>() { Entity = utilizator });
        }

        // DELETE api/<controller>/5
        public void Delete(string id)
        {
            CommandService.Execute(new DeleteEntity<Utilizator>() { Id = id });
        }
    }
}