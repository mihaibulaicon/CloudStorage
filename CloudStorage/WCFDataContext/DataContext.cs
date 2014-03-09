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
        public IQueryable<Sectie> Sectii
        {
            get
            {
                queryService = DependencyResolver.Current.GetService<IQueryService>();
                var sectii = queryService.Execute(new GetAllEntitiesOfType<Sectie>()) as IQueryable<Sectie>;
                return sectii;
            }
        }
        public IQueryable<Birou> Birouri
        {
            get
            {
                queryService = DependencyResolver.Current.GetService<IQueryService>();
                var birouri = queryService.Execute(new GetAllEntitiesOfType<Birou>()) as IQueryable<Birou>;
                return birouri;
            }
        }
    }

}