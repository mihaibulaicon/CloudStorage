using DatabaseEntities;
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
    public class BaseController<T> : ApiController where T : BaseEntity
    {
        public ICommandService CommandService { get; set; }
        public IQueryService QueryService { get; set; }
        public BaseController() { }
        public BaseController(ICommandService commandService, IQueryService queryService)
        {
            CommandService = commandService;
            QueryService = queryService;
        }


        // GET api/<controller>
        public IQueryable<T> Get()
        {
            var entities = QueryService.Execute(new GetAllEntitiesOfType<T>());
            return entities as IQueryable<T>;
        }

        // GET api/<controller>/5
        public string Get(string id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]T value)
        {
        }
        
        // PUT api/<controller>/5
        [HttpPut]
        public virtual void Put(IEnumerable<T> entities)
        {
            foreach(var entity in entities)
               CommandService.Execute(new SaveOrUpdateEntity<T>() { Entity = entity });
        }

        // DELETE api/<controller>/5
        public void Delete(string id)
        {
            CommandService.Execute(new DeleteEntity<T>() { Id = id });
        }
    }
}