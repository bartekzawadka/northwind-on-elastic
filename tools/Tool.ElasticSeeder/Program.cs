using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CommandLine;
using Microsoft.Extensions.Configuration;
using Serilog;
using Tool.ElasticSeeder.Configuration;

namespace Tool.ElasticSeeder
{
    internal static class Program
    {
        private static Task Main(string[] args)
        {
            SetupLogger();
            
            return Parser
                .Default
                .ParseArguments<Options>(args)
                .WithParsedAsync(async options => 
                {
                    ValidateArguments(options);
                    Log.Logger.Information($"Data file path: {options.IndexDataFilePath}");
                    if (options.CreateIndexIfNotExists)
                    {
                        Log.Logger.Information($"Index creation body content: {options.IndexCreationBodyFilePath}");
                    }

                    var seederConfiguration = new SeederConfiguration
                    {
                        CreateIndexIfNotExists = options.CreateIndexIfNotExists,
                        DataFilePath = options.IndexDataFilePath,
                        CreateIndexRequestBodyContentFilePath = options.IndexCreationBodyFilePath
                    };

                    ElasticsearchConfiguration elasticConfiguration = GetElasticsearchConfiguration();
                    var seeder = new ElasticsearchSeeder(seederConfiguration, elasticConfiguration);
                    await seeder.SeedAsync();
                });
        }

        private static ElasticsearchConfiguration GetElasticsearchConfiguration()
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(AppContext.BaseDirectory)?.FullName)
                .AddJsonFile("appsettings.json", false)
                .AddEnvironmentVariables()
                .Build();

            IConfigurationSection elasticSection = configuration.GetSection(nameof(ElasticsearchConfiguration));
            var elasticConfiguration = elasticSection.Get<ElasticsearchConfiguration>();
            ReplaceSettingWithEnvVarIfSet<string>(EnvironmentVariables.ElasticsearchUrl, s => elasticConfiguration.Address = s);
            ReplaceSettingWithEnvVarIfSet<int>(EnvironmentVariables.ElasticsearchPort, s => elasticConfiguration.Port = s);
            ReplaceSettingWithEnvVarIfSet<string>(EnvironmentVariables.ElasticsearchIndexName, s => elasticConfiguration.IndexName = s);
            ReplaceSettingWithEnvVarIfSet<string>(EnvironmentVariables.ElasticsearchUsername, s => elasticConfiguration.Username = s);
            ReplaceSettingWithEnvVarIfSet<string>(EnvironmentVariables.ElasticsearchPassword, s => elasticConfiguration.Password = s);

            return elasticConfiguration;
        }

        private static void ReplaceSettingWithEnvVarIfSet<T>(string environmentVar, Action<T> action)
        {
            string value = Environment.GetEnvironmentVariable(environmentVar);
            if (string.IsNullOrWhiteSpace(value))
            {
                return;
            }

            var convertedValue = (T)Convert.ChangeType(value, typeof(T));
            action(convertedValue);
        }

        private static void SetupLogger() =>
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

        private static void ValidateArguments(Options options)
        {
            if (options.CreateIndexIfNotExists
                && (string.IsNullOrWhiteSpace(options.IndexCreationBodyFilePath) || !File.Exists(options.IndexCreationBodyFilePath)))
            {
                throw new ArgumentException("Index creation body file is required for index creation");
            }
        }
    }
}