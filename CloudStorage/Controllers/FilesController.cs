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
    public class FilesController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public FilesController() { }
        public FilesController(ICommandService commandService, IQueryService queryService)
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
                    var type = postedFile.FileName.Split('.')[1];
                    var savedId = CommandService.Execute<string>(new SaveOrUpdateEntity<DatabaseEntities.File>() { Entity = new DatabaseEntities.File() { Type = type, FileName = postedFile.FileName, UserName = tokenArray[0], FileType = postedFile.ContentType, FolderId = file } });
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
        public IEnumerable<DatabaseEntities.File> Get(string folderId, string username)
        {
            var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
            var tokenArray = authorizeToken.Split(':');
            var documents = QueryService.Execute<IEnumerable<DatabaseEntities.File>>(new GetFilesByUsernameAndFolder() { Username = tokenArray[0], FolderId = folderId });
            return documents;
        }
        public FileReturnType Get(string id)
        {
            var document = QueryService.Execute<DatabaseEntities.File>(new GetEntityById<DatabaseEntities.File>() { Id = id });
            var data = QueryService.Execute<Attachment>(new GetAttachmentById() { Id = id }).Data();
            var byteArray = new byte[data.Length];
            data.Read(byteArray, 0, (int)data.Length);
            var documentForReturn = new FileReturnType()
            {
                Id = document.Id,
                Name = document.FileName,
                Type = document.FileType,
                IconType = document.Type,
                ByteArray = byteArray
            };
            return documentForReturn;
        }

        [System.Web.Http.HttpDelete]
        public void Delete(int type, string id, string diff)
        {
            if (type == 0) //delete file 
            {
                CommandService.Execute(new DeleteEntity<DatabaseEntities.File>() { Id = id });
            }
            else   //delete folder
            {
                var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
                var tokenArray = authorizeToken.Split(':');
                var files = QueryService.Execute<IEnumerable<DatabaseEntities.File>>(new GetFilesByUsernameAndFolder() { Username = tokenArray[0], FolderId = id });
                foreach (var file in files)
                {
                    CommandService.Execute(new DeleteEntity<DatabaseEntities.File>() { Id = file.Id });
                }
                CommandService.Execute(new DeleteEntity<Folder>() { Id = id });
            }
        }
    }

}
