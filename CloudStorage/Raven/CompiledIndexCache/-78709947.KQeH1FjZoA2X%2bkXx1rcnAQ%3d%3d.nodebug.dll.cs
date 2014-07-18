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


public class Index_Auto_2fFolders_2fByFolderTypeAndUsername : Raven.Database.Linq.AbstractViewGenerator
{
	public Index_Auto_2fFolders_2fByFolderTypeAndUsername()
	{
		this.ViewText = @"from doc in docs.Folders
select new { FolderType = doc.FolderType, Username = doc.Username }";
		this.ForEntityNames.Add("Folders");
		this.AddMapDefinition(docs => 
			from doc in docs
			where string.Equals(doc["@metadata"]["Raven-Entity-Name"], "Folders", System.StringComparison.InvariantCultureIgnoreCase)
			select new {
				FolderType = doc.FolderType,
				Username = doc.Username,
				__document_id = doc.__document_id
			});
		this.AddField("FolderType");
		this.AddField("Username");
		this.AddField("__document_id");
		this.AddQueryParameterForMap("FolderType");
		this.AddQueryParameterForMap("Username");
		this.AddQueryParameterForMap("__document_id");
		this.AddQueryParameterForReduce("FolderType");
		this.AddQueryParameterForReduce("Username");
		this.AddQueryParameterForReduce("__document_id");
	}
}
