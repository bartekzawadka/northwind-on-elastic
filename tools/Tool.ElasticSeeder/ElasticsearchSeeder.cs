using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Elasticsearch.Net;
using Serilog;
using Tool.ElasticSeeder.Configuration;

namespace Tool.ElasticSeeder
{
    public class ElasticsearchSeeder
    {
        private readonly SeederConfiguration _seederConfiguration;
        private readonly ElasticsearchConfiguration _elasticsearchConfiguration;

        public ElasticsearchSeeder(
            SeederConfiguration seederConfiguration,
            ElasticsearchConfiguration elasticsearchConfiguration)
        {
            _seederConfiguration = seederConfiguration;
            _elasticsearchConfiguration = elasticsearchConfiguration;
        }

        public async Task SeedAsync()
        {
            IElasticLowLevelClient client = GetElasticsearchClient();
            await CreateIndexIfNeededAsync(client);
            
            //TODO: Iterate through products
        }

        private async Task CreateIndexIfNeededAsync(IElasticLowLevelClient client)
        {
            if (!_seederConfiguration.CreateIndexIfNotExists)
            {
                return;
            }
            
            StringResponse result = await client.Indices.ExistsAsync<StringResponse>(_elasticsearchConfiguration.IndexName);
            if (result.HttpStatusCode == (int) HttpStatusCode.NotFound)
            {
                string json = await File.ReadAllTextAsync(_seederConfiguration.CreateIndexRequestBodyContentFilePath);
                StringResponse response = await client.Indices.CreateAsync<StringResponse>(
                    _elasticsearchConfiguration.IndexName,
                    PostData.String(json));

                if (!response.Success)
                {
                    const string messageConst = "Unable to create index. Response from server: ";
                    ServerError error;
                    var message = response.TryGetServerError(out error)
                        ? $"{messageConst}{error.Error.Reason}"
                        : $"{messageConst}{response.Body}";

                    throw new SystemException(message);
                }

                Log.Logger.Information($"Index '{_elasticsearchConfiguration.IndexName}' created");
            }
            else if (!result.Success)
            {
                Log.Logger.Warning($"Unable to check if index exists. Server response: [{result.HttpStatusCode}] {result.Body}");
            }
        }

        private ElasticLowLevelClient GetElasticsearchClient()
        {
            var node = new Uri($"{_elasticsearchConfiguration.Address}:{_elasticsearchConfiguration.Port}");
            var config = new ConnectionConfiguration(node);
            config.BasicAuthentication(_elasticsearchConfiguration.Username, _elasticsearchConfiguration.Password);
            config.ServerCertificateValidationCallback((o, certificate, arg3, arg4) => true);
            return new ElasticLowLevelClient(config);
        }
    }
}