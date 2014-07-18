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


public class Index_Auto_2fUtilizators_2fByEmailAndPasswordAndUsername : Raven.Database.Linq.AbstractViewGenerator
{
	public Index_Auto_2fUtilizators_2fByEmailAndPasswordAndUsername()
	{
		this.ViewText = @"from doc in docs.Utilizators
select new { Username = doc.Username, Email = doc.Email, Password = doc.Password }";
		this.ForEntityNames.Add("Utilizators");
		this.AddMapDefinition(docs => 
			from doc in docs
			where string.Equals(doc["@metadata"]["Raven-Entity-Name"], "Utilizators", System.StringComparison.InvariantCultureIgnoreCase)
			select new {
				Username = doc.Username,
				Email = doc.Email,
				Password = doc.Password,
				__document_id = doc.__document_id
			});
		this.AddField("Username");
		this.AddField("Email");
		this.AddField("Password");
		this.AddField("__document_id");
		this.AddQueryParameterForMap("Username");
		this.AddQueryParameterForMap("Email");
		this.AddQueryParameterForMap("Password");
		this.AddQueryParameterForMap("__document_id");
		this.AddQueryParameterForReduce("Username");
		this.AddQueryParameterForReduce("Email");
		this.AddQueryParameterForReduce("Password");
		this.AddQueryParameterForReduce("__document_id");
	}
}
