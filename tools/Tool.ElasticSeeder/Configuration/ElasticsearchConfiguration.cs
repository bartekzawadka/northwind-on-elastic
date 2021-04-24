namespace Tool.ElasticSeeder.Configuration
{
    public class ElasticsearchConfiguration
    {
        public string Address { get; set; }

        public int Port { get; set; }

        public string IndexName { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }
}