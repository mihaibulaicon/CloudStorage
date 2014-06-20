using CloudStorage.Attributes;
using CloudStorage.Models;
using DatabaseEntities;
using Raven.Abstractions.Data;
using RavenDatabase;
using RavenDatabase.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Drawing;
using System.IO;
using NReco.VideoConverter;
using System.Web.Mvc;
using System.Net.Http.Headers;

namespace CloudStorage.Controllers
{
    [TokenAuthorizationFilter(true)]
    public class VideosController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public VideosController() { }
        public VideosController(ICommandService commandService, IQueryService queryService)
        {
            CommandService = commandService;
            QueryService = queryService;
        }
        public HttpResponseMessage Post()
        {
            var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
            var tokenArray = authorizeToken.Split(':');
            HttpResponseMessage result = null;
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var savedId = CommandService.Execute<string>(new SaveOrUpdateEntity<Video>() { Entity = new Video() { FileName = postedFile.FileName, UserName = tokenArray[0], VideoType = postedFile.ContentType, FolderId = file } });
                    CommandService.Execute<string>(new SaveAtachment() { Id = savedId, File = postedFile.InputStream });
                }
                result = Request.CreateResponse(HttpStatusCode.Created);
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            return result;
        }
        [System.Web.Http.HttpGet]
        public IEnumerable<PhotoReturnType> Get(string folderId, string username)
        {
            var videoConverter = new FFMpegConverter();
            var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
            var tokenArray = authorizeToken.Split(':');
            var videos = QueryService.Execute<IEnumerable<Video>>(new GetVideosByUsernameAndFolder() { Username = tokenArray[0], FolderId = folderId });
            var videoList = new List<PhotoReturnType>();

            foreach (var video in videos)
            {
                // Stream data = new MemoryStream();



                Image.GetThumbnailImageAbort myCallback =
                           new Image.GetThumbnailImageAbort(ThumbnailCallback);

                var data = QueryService.Execute<Attachment>(new GetAttachmentById() { Id = video.Id }).Data();
                var byteArray = new byte[data.Length];
                data.Read(byteArray, 0, (int)data.Length);
                var file = File.Create("/temp-video");
                file.Write(byteArray, 0, byteArray.Length);
                file.Close();
                var imageData = new MemoryStream();
                videoConverter.GetVideoThumbnail("/temp-video", imageData, 5);

                var image = new Bitmap(imageData);
                var thumbnail = image.GetThumbnailImage(100, 100, myCallback, IntPtr.Zero);
                var photoForReturn = new PhotoReturnType()
                {
                    Id = video.Id,
                    Name = video.FileName,
                    Type = "image/png",
                    ByteArray = imageToByteArray(thumbnail)
                };
                videoList.Add(photoForReturn);
            }
            return videoList;
        }
        public PhotoReturnType Get(string id)
        {
            var video = QueryService.Execute<Video>(new GetEntityById<Video>() { Id = id });
            var data = QueryService.Execute<Attachment>(new GetAttachmentById() { Id = id }).Data();
            var byteArray = new byte[data.Length];
            data.Read(byteArray, 0, (int)data.Length);
            var photoForReturn = new PhotoReturnType()
            {
                Id = video.Id,
                Name = video.FileName,
                Type = video.VideoType,
                ByteArray = byteArray,
            };
            return photoForReturn;

        }

        [System.Web.Http.HttpDelete]
        public void Delete(int type, string id,string diff)
        {
            if (type == 0) //delete file 
            {
                CommandService.Execute(new DeleteEntity<Video>() { Id = id });
            }
            else   //delete folder
            {
                var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
                var tokenArray = authorizeToken.Split(':');
                var videos = QueryService.Execute<IEnumerable<Video>>(new GetVideosByUsernameAndFolder() { Username = tokenArray[0], FolderId = id });
                foreach(var video in videos)
                {
                    CommandService.Execute(new DeleteEntity<Video>(){Id = video.Id});
                }
                CommandService.Execute(new DeleteEntity<Folder>() { Id = id });
            }
        }
     
        private bool ThumbnailCallback()
        {
            return false;
        }
        private byte[] imageToByteArray(System.Drawing.Image imageIn)
        {
            MemoryStream ms = new MemoryStream();
            imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
            return ms.ToArray();
        }
    }
}
