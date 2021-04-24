using CommandLine;

namespace Tool.ElasticSeedBuilder
{
    public class Options
    {
        [Option('i', "inputFile", Required = true, HelpText = "Path to input file containing raw Northwind data")]
        public string InputFilePath { get; set; }

        [Option('o', "outputFile", Required = true, HelpText = "Path to output file with Elasticsearch - ready dataset")]
        public string OutputFilePath { get; set; }
    }
}