using System;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Tool.ElasticSeedBuilder.Helpers
{
    public class JsonHelper
    {
        public static T ReadJsonFile<T>(string path)
        {
            try
            {
                string jsonText = File.ReadAllText(path);
                JToken.Parse(jsonText);
                return JsonConvert.DeserializeObject<T>(jsonText);
            }
            catch(Exception ex)
            {
                throw new ArgumentException("Invalid or missing JSON file", ex);
            }
        }
    }
}