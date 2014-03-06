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


public class Index_Auto_2fUtilizators_2fByPrenumeSortByPrenume : Raven.Database.Linq.AbstractViewGenerator
{
	public Index_Auto_2fUtilizators_2fByPrenumeSortByPrenume()
	{
		this.ViewText = @"from doc in docs.Utilizators
select new { Prenume = doc.Prenume }";
		this.ForEntityNames.Add("Utilizators");
		this.AddMapDefinition(docs => 
			from doc in docs
			where string.Equals(doc["@metadata"]["Raven-Entity-Name"], "Utilizators", System.StringComparison.InvariantCultureIgnoreCase)
			select new {
				Prenume = doc.Prenume,
				__document_id = doc.__document_id
			});
		this.AddField("Prenume");
		this.AddField("__document_id");
		this.AddQueryParameterForMap("Prenume");
		this.AddQueryParameterForMap("__document_id");
		this.AddQueryParameterForReduce("Prenume");
		this.AddQueryParameterForReduce("__document_id");
	}
}
