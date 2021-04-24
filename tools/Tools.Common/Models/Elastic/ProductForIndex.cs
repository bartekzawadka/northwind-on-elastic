using System.Collections.Generic;
using Newtonsoft.Json;

namespace Tools.Common.Models.Elastic
{
    public class ProductForIndex
    {
        [JsonProperty("search_result_data")]
        public SearchResultData SearchResultData { get; set; }

        [JsonProperty("search_data")]
        public SearchData SearchData { get; set; }

        [JsonProperty("completion_terms")]
        public ICollection<string> CompletionTerms { get; set; }
        
        [JsonProperty("suggestion_terms")]
        public ICollection<string> SuggestionTerms { get; set; }

        [JsonProperty("number_sort")]
        public NumberSort NumberSort { get; set; }

        [JsonProperty("string_sort")]
        public StringSort StringSort { get; set; }
    }
}