using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Routing;

namespace CloudStorage
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
                name:"folder",
                routeTemplate: "api/{controller}/{folderId}/{username}"
                );
            config.Routes.MapHttpRoute(
              name: "delete",
              routeTemplate: "api/{controller}/{type}/{id}/{diff}"
              );
            //config.Routes.MapHttpRoute(
            //    string.Empty,
            //    "api/{controller}/{type}/{id}",
            //    new { controller = "Photos", action = "Delete" },
            //    new { httpMethod = new HttpMethodConstraint(HttpMethod.Delete) }
            //);
            config.Formatters.JsonFormatter.SerializerSettings.TypeNameHandling = TypeNameHandling.Auto;
            config.Formatters.JsonFormatter.SerializerSettings.Converters.Add(
           new IsoDateTimeConverter());
        }
    }
}
