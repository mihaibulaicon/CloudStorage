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


public class Index_Auto_2fUtilizators_2fByPasswordAndUsername : Raven.Database.Linq.AbstractViewGenerator
{
	public Index_Auto_2fUtilizators_2fByPasswordAndUsername()
	{
		this.ViewText = @"from doc in docs.Utilizators
select new { Password = doc.Password, Username = doc.Username }";
		this.ForEntityNames.Add("Utilizators");
		this.AddMapDefinition(docs => 
			from doc in docs
			where string.Equals(doc["@metadata"]["Raven-Entity-Name"], "Utilizators", System.StringComparison.InvariantCultureIgnoreCase)
			select new {
				Password = doc.Password,
				Username = doc.Username,
				__document_id = doc.__document_id
			});
		this.AddField("Password");
		this.AddField("Username");
		this.AddField("__document_id");
		this.AddQueryParameterForMap("Password");
		this.AddQueryParameterForMap("Username");
		this.AddQueryParameterForMap("__document_id");
		this.AddQueryParameterForReduce("Password");
		this.AddQueryParameterForReduce("Username");
		this.AddQueryParameterForReduce("__document_id");
	}
}
