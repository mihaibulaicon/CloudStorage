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
select new { Password = doc.Password, Username = doc.Username, Email = doc.Email }";
		this.ForEntityNames.Add("Utilizators");
		this.AddMapDefinition(docs => 
			from doc in docs
			where string.Equals(doc["@metadata"]["Raven-Entity-Name"], "Utilizators", System.StringComparison.InvariantCultureIgnoreCase)
			select new {
				Password = doc.Password,
				Username = doc.Username,
				Email = doc.Email,
				__document_id = doc.__document_id
			});
		this.AddField("Password");
		this.AddField("Username");
		this.AddField("Email");
		this.AddField("__document_id");
		this.AddQueryParameterForMap("Password");
		this.AddQueryParameterForMap("Username");
		this.AddQueryParameterForMap("Email");
		this.AddQueryParameterForMap("__document_id");
		this.AddQueryParameterForReduce("Password");
		this.AddQueryParameterForReduce("Username");
		this.AddQueryParameterForReduce("Email");
		this.AddQueryParameterForReduce("__document_id");
	}
}
