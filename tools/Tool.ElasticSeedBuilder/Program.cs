using System.Collections.Generic;
using System.IO;
using CommandLine;
using Serilog;
using Tool.ElasticSeedBuilder.Builders;
using Tool.ElasticSeedBuilder.Helpers;
using Tool.ElasticSeedBuilder.Models;

namespace Tool.ElasticSeedBuilder
{
    internal static class Program
    {
        private static void Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();
            
            Parser
                .Default
                .ParseArguments<Options>(args)
                .WithParsed(o =>
                {
                    Log.Logger.Information($"Using input file: {o.InputFilePath}");
                    Log.Logger.Information($"Using output file: {o.OutputFilePath}");
                    
                    ValidateInputFile(o.InputFilePath);
                    var inputProducts = JsonHelper.ReadJsonFile<ICollection<InputDataProductEntry>>(o.InputFilePath);
                    new ElasticsearchProductsBuilder()
                        .WithInputJsonData(inputProducts)
                        .WithOutputPath(o.OutputFilePath)
                        .BuildAndSave();
                });
        }

        private static void ValidateInputFile(string path)
        {
            if (!File.Exists(path))
            {
                throw new FileNotFoundException("Unable to find input file at specified location");
            }
            
            Log.Logger.Information("Input file validation passed");
        }
    }
}