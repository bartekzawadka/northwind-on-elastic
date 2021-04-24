namespace Tool.ElasticSeeder.Configuration
{
    public class SeederConfiguration
    {
        public string DataFilePath { get; set; }

        public string CreateIndexRequestBodyContentFilePath { get; set; }

        public bool CreateIndexIfNotExists { get; set; }
    }
}