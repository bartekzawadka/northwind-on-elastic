using Newtonsoft.Json;

namespace Tools.Common.Models.Elastic
{
    public class NumberSort
    {
        [JsonProperty("gross_price")]
        public double GrossPrice { get; set; }
    }
}