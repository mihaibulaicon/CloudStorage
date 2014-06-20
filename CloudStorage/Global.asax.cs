using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using CloudStorage.Attributes;
using CloudStorage.Services;
using Raven.Client;
using Raven.Client.Embedded;
using RavenDatabase;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace CloudStorage
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        public ContainerBuilder builder { get; set; }
        private IDocumentStore documentStore { get; set; }
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            AutofacSetup();
        }
        void Session_Start(object sender, EventArgs e)
        {
            
        }
        private void AutofacSetup()
        {
            builder = new ContainerBuilder();
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterApiControllers(typeof(MvcApplication).Assembly);
            RegisterTypes(builder);
            RegisterRavenDb(builder);
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            var resolver = new AutofacWebApiDependencyResolver(container);

            // Configure Web API with the dependency resolver.
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }
        
        private void RegisterTypes(ContainerBuilder builder)
        {
            builder.RegisterType<CommandService>().As<ICommandService>();
            builder.RegisterType<QueryService>().As<IQueryService>();
        }
        protected virtual void RegisterRavenDb(ContainerBuilder builder)
        {
            documentStore = new EmbeddableDocumentStore { DataDirectory = "D:\\CloudStorage\\CloudStorage1", UseEmbeddedHttpServer = true, Configuration = { Port = 8092 } };
            documentStore.Initialize();
            documentStore.Conventions.IdentityPartsSeparator = "-";
            documentStore.Conventions.MaxNumberOfRequestsPerSession = 1000;
            builder.Register(c => documentStore).As<IDocumentStore>().SingleInstance();
            var session = documentStore.OpenSession();

            builder.Register(c => session).As<IDocumentSession>().InstancePerLifetimeScope();
        }
    }
}