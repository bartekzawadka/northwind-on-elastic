using System.Collections.Generic;
using Newtonsoft.Json;

namespace Tools.Common.Models.Elastic
{
    public class SearchData
    {
        [JsonProperty("full_text")]
        public string FullText { get; set; }

        [JsonProperty("string_facet")]
        public ICollection<Facet<string>> StringFacet { get; set; }

        [JsonProperty("number_facet")]
        public ICollection<Facet<double>> NumberFacet { get; set; }
    }
}