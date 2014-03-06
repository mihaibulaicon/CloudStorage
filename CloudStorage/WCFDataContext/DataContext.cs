using CloudStorage.DatabaseEntities.Structure;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CloudStorage.WCFDataContext
{
    public class DataContext
    {
        IQueryService queryService { get; set; }
        public IQueryable<Rank> Ranks
        {
            get
            {
               queryService = DependencyResolver.Current.GetService<IQueryService>();
               var ranks = queryService.Execute(new GetAllEntitiesOfType<Rank>()) as IQueryable<Rank>;
               return ranks;
            }
        }
    }

}