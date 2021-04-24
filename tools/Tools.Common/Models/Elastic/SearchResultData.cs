using Newtonsoft.Json;

namespace Tools.Common.Models.Elastic
{
    public class SearchResultData
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("number_of_products")]
        public int NumberOfProducts { get; set; }

        [JsonProperty("quantity_per_unit")]
        public string QuantityPerUnit { get; set; }
        
        [JsonProperty("category")]
        public string Category { get; set; }

        [JsonProperty("supplier")]
        public string Supplier { get; set; }
    }
}