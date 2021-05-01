using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Elasticsearch.Net;
using Newtonsoft.Json;
using Serilog;
using Tool.ElasticSeeder.Configuration;
using Tools.Common.Helpers;
using Tools.Common.Models.Elastic;

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
            
            ICollection<ProductForIndex> data = JsonHelper.ReadJsonFile<ICollection<ProductForIndex>>(_seederConfiguration.DataFilePath);
            if (data == null || data.Count == 0)
            {
                Log.Logger.Warning("No elements found for indexing");
                return;
            }
            
            Log.Logger.Information($"{data.Count} products found to be indexed");
            foreach (ProductForIndex productForIndex in data)
            {
                await IndexProductAsync(productForIndex, client);
            }
            
            Log.Logger.Information("Seeding completed");
        }

        private async Task IndexProductAsync(ProductForIndex productForIndex, IElasticLowLevelClient client)
        {
            string insertData = JsonConvert.SerializeObject(productForIndex);
            Log.Logger.Information($"Inserting product: [{productForIndex.SearchResultData.Id}]' {productForIndex.SearchResultData.Name}'");
            StringResponse response = await client.IndexAsync<StringResponse>(
                _elasticsearchConfiguration.IndexName,
                productForIndex.SearchResultData.Id.ToString(),
                PostData.String(insertData));
            if (response.Success)
            {
                Log.Logger.Information($"Product [{productForIndex.SearchResultData.Id}]' {productForIndex.SearchResultData.Name}' successfuly indexed");
            }
            else
            {
                Log.Logger.Error($"Unable to index product (ID: {productForIndex.SearchResultData.Id}): {response.Body}");
            }
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
            if (!string.IsNullOrWhiteSpace(_elasticsearchConfiguration.Username))
            {
                config.BasicAuthentication(_elasticsearchConfiguration.Username, _elasticsearchConfiguration.Password);
            }

            config.ServerCertificateValidationCallback((o, certificate, arg3, arg4) => true);
            return new ElasticLowLevelClient(config);
        }
    }
}