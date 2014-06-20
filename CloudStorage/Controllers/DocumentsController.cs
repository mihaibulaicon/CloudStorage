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
    public class DocumentsController : ApiController
    {
        ICommandService CommandService { get; set; }
        IQueryService QueryService { get; set; }
        public DocumentsController() { }
        public DocumentsController(ICommandService commandService, IQueryService queryService)
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
                    var savedId = CommandService.Execute<string>(new SaveOrUpdateEntity<Document>() { Entity = new Document() { Type = type, FileName = postedFile.FileName, UserName = tokenArray[0], DocumentType = postedFile.ContentType, FolderId = file } });
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
        public IEnumerable<Document> Get(string folderId, string username)
        {
            var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
            var tokenArray = authorizeToken.Split(':');
            var documents = QueryService.Execute<IEnumerable<Document>>(new GetDocumentsByUsernameAndFolder() { Username = tokenArray[0], FolderId = folderId });
            return documents;
        }
        public DocumentReturnType Get(string id)
        {
            var document = QueryService.Execute<Document>(new GetEntityById<Document>(){Id = id});
            var data = QueryService.Execute<Attachment>(new GetAttachmentById() { Id = id }).Data();
            var byteArray = new byte[data.Length];
            data.Read(byteArray, 0, (int)data.Length);
            var documentForReturn = new DocumentReturnType()
            {
                Id=document.Id,
                Name = document.FileName,
                Type = document.DocumentType,
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
                CommandService.Execute(new DeleteEntity<Document>() { Id = id });
            }
            else   //delete folder
            {
                var authorizeToken = HttpContext.Current.Request.Headers.GetValues("x-session-token").First();
                var tokenArray = authorizeToken.Split(':');
                var videos = QueryService.Execute<IEnumerable<Document>>(new GetDocumentsByUsernameAndFolder() { Username = tokenArray[0], FolderId = id });
                foreach (var video in videos)
                {
                    CommandService.Execute(new DeleteEntity<Document>() { Id = video.Id });
                }
                CommandService.Execute(new DeleteEntity<Folder>() { Id = id });
            }
        }
    }

}
