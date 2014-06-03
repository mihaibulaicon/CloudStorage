using RavenDatabase;
using RavenDatabase.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using System.Web.Mvc;

namespace CloudStorage.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
    public class TokenAuthorizationFilter : AuthorizationFilterAttribute
    {
        bool Active = true;

        public TokenAuthorizationFilter()
        { }

        public TokenAuthorizationFilter(bool active)
        {
            Active = active;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (Active)
            {
                var queryService = DependencyResolver.Current.GetService<IQueryService>();

                var authorizeToken = actionContext.Request.Headers.First(h => h.Key == "x-session-token").Value.First();
                var tokenArray = authorizeToken.Split(':');
                var auth = queryService.Execute<bool>(new AuthenticateUser() { UserName = tokenArray[0], Password = tokenArray[1] });
                if (!auth)
                {
                    var host = actionContext.Request.RequestUri.DnsSafeHost;
                    actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized);
                }
                base.OnAuthorization(actionContext);
            }
        }

     
    }
}