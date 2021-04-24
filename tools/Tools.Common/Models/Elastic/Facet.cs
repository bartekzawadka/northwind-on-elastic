using Newtonsoft.Json;

namespace Tools.Common.Models.Elastic
{
    public class Facet<T>
    {
        [JsonProperty("facet_name")]
        public string FacetName { get; set; }

        [JsonProperty("facet_value")]
        public T FacetValue { get; set; }
    }
}