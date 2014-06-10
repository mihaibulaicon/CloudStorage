using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class GetPhotosByUsername : IQueryDefinition<IEnumerable<Photo>>
    {
        public string Username { get; set; }
        public IEnumerable<Photo> Execute(IDocumentSession documentSession)
        {
            var photos = from photo in documentSession.Query<Photo>()
                        where  photo.UserName == Username
                        select photo;
            return photos;
        }
    }
}
