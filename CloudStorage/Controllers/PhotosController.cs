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

namespace CloudStorage.Controllers
{
    [TokenAuthorizationFilter(true)]
    public class PhotosController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public PhotosController() { }
        public PhotosController(ICommandService commandService, IQueryService queryService)
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
                    var savedId = CommandService.Execute<string>(new SaveOrUpdateEntity<Photo>() { Entity = new Photo() { FileName = postedFile.FileName, UserName = tokenArray[0], ImageType = postedFile.ContentType, FolderId = file } });
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
        public IEnumerable<PhotoReturnType> Get(string folderId,string username)
        {
            var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
            var tokenArray = authorizeToken.Split(':');
            var photos = QueryService.Execute<IEnumerable<Photo>>(new GetPhotosByUsernameAndFolder() { Username = tokenArray[0], FolderId = folderId });
            var photoList = new List<PhotoReturnType>();
            foreach (var photo in photos)
            {
                Image.GetThumbnailImageAbort myCallback =
                           new Image.GetThumbnailImageAbort(ThumbnailCallback);

                var data = QueryService.Execute<Attachment>(new GetAttachmentById() { Id = photo.Id }).Data();
               // var byteArray = new byte[data.Length];
               // data.Read(byteArray, 0, (int)data.Length);
                var image = new Bitmap(data);
                var thumbnail = image.GetThumbnailImage(100, 100, myCallback, IntPtr.Zero);
                var photoForReturn = new PhotoReturnType()
                {
                    Id= photo.Id,
                    Name = photo.FileName,
                    Type = photo.ImageType,
                    ByteArray = imageToByteArray(thumbnail)
                };
                photoList.Add(photoForReturn);
            }
            return photoList;
        }
        public PhotoReturnType Get(string id)
        {
            var photo = QueryService.Execute<Photo>(new GetEntityById<Photo>() { Id = id });
            var data = QueryService.Execute<Attachment>(new GetAttachmentById() { Id = id }).Data();
            var byteArray = new byte[data.Length];
            data.Read(byteArray, 0, (int)data.Length);
            var photoForReturn = new PhotoReturnType()
            {
                Id = photo.Id,
                Name = photo.FileName,
                Type = photo.ImageType,
                ByteArray = byteArray,
            };
            return photoForReturn;
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
