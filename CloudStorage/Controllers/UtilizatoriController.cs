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
    public class UtilizatoriController : BaseController<Utilizator>
    {
        public UtilizatoriController() { }
        public UtilizatoriController(ICommandService commandService, IQueryService queryService)
            : base(commandService, queryService)
        {
        }
        
        public override void Put(IEnumerable<Utilizator> entities)
        {
            foreach(var entity in entities)
            {
               CommandService.Execute(new SaveOrUpdateEntity<Utilizator>() { Entity = entity });
               var materiale=(QueryService.Execute(new GetAllEntitiesOfType<Material>()) as IQueryable<Material>).Where(m => m.UtilizatorId == entity.Id);
               foreach(var material in materiale)
               {
                   material.ServiciuId = entity.ServiciuId;
                   material.SectieId =  entity.SectieId;
                   material.BirouId = entity.BirouId;
                   CommandService.Execute(new SaveOrUpdateEntity<Material>(){Entity = material});
               }
            }
        }

    }
}
