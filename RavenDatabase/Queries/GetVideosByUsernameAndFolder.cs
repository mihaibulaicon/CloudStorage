using DatabaseEntities;
using Raven.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RavenDatabase.Queries
{
    public class GetVideosByUsernameAndFolder : IQueryDefinition<IEnumerable<Video>>
    {
        public string Username { get; set; }
        public string FolderId { get; set; }
        public IEnumerable<Video> Execute(IDocumentSession documentSession)
        {
            var videos = from video in documentSession.Query<Video>()
                         where video.UserName == Username
                         && video.FolderId == FolderId
                         select video;
            return videos;
        }
    }
}
