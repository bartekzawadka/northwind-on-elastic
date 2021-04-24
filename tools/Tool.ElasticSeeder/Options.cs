using CommandLine;

namespace Tool.ElasticSeeder
{
    public class Options
    {
        [Option(
            'c',
            "createIndexIfNotExists",
            Required = false,
            Default = false,
            HelpText = "If index not found, it will be created. If set to true, then 'indexCreationBodyFile' is required")]
        public bool CreateIndexIfNotExists { get; set; }
        
        [Option('b', "indexCreationBodyFile", Required = true, HelpText = "Path to index creation request body content file")]
        public string IndexCreationBodyFilePath { get; set; }

        [Option('d', "indexDataFile", Required = true, HelpText = "Path to file containing data for seeding")]
        public string IndexDataFilePath { get; set; }
    }
}