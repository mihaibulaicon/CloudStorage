using CloudStorage.WCFDataContext;
using DatabaseEntities;

using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Web;
using System.Web;
using System.ServiceModel;
using System.Data.Services;
using System.Data.Services.Common;
using Microsoft.Data.Services.Toolkit;

namespace CloudStorage
{
    public class EntitiesService : ODataService<DataContext>
    {
        // This method is called only once to initialize service-wide policies.
        public static void InitializeService(System.Data.Services.DataServiceConfiguration config)
        {
            // TODO: set rules to indicate which entity sets and service operations are visible, updatable, etc.
            // Examples:
            config.SetEntitySetAccessRule("*", EntitySetRights.AllRead);
            // config.SetServiceOperationAccessRule("MyServiceOperation", ServiceOperationRights.All);
            config.DataServiceBehavior.MaxProtocolVersion = DataServiceProtocolVersion.V2;
        }
    }
}
