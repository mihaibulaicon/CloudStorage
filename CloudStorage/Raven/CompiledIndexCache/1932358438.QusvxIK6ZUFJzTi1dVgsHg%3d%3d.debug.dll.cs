using Raven.Abstractions;
using Raven.Database.Linq;
using System.Linq;
using System.Collections.Generic;
using System.Collections;
using System;
using Raven.Database.Linq.PrivateExtensions;
using Lucene.Net.Documents;
using System.Globalization;
using System.Text.RegularExpressions;
using Raven.Database.Indexing;


public class Index_Auto_2fPhotos_2fByFolderIdAndUserName : Raven.Database.Linq.AbstractViewGenerator
{
	public Index_Auto_2fPhotos_2fByFolderIdAndUserName()
	{
		this.ViewText = @"from doc in docs.Photos
select new { UserName = doc.UserName, FolderId = doc.FolderId }";
		this.ForEntityNames.Add("Photos");
		this.AddMapDefinition(docs => 
			from doc in docs
			where string.Equals(doc["@metadata"]["Raven-Entity-Name"], "Photos", System.StringComparison.InvariantCultureIgnoreCase)
			select new {
				UserName = doc.UserName,
				FolderId = doc.FolderId,
				__document_id = doc.__document_id
			});
		this.AddField("UserName");
		this.AddField("FolderId");
		this.AddField("__document_id");
		this.AddQueryParameterForMap("UserName");
		this.AddQueryParameterForMap("FolderId");
		this.AddQueryParameterForMap("__document_id");
		this.AddQueryParameterForReduce("UserName");
		this.AddQueryParameterForReduce("FolderId");
		this.AddQueryParameterForReduce("__document_id");
	}
}
