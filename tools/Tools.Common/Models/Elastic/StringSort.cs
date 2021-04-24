using Newtonsoft.Json;

namespace Tools.Common.Models.Elastic
{
    public class StringSort
    {
        [JsonProperty("name")]
        public string Name { get; set; }
    }
}