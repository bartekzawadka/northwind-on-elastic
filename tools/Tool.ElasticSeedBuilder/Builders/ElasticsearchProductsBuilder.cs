using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Serilog;
using Tool.ElasticSeedBuilder.Models;
using Tools.Common.Models.Elastic;

namespace Tool.ElasticSeedBuilder.Builders
{
    public class ElasticsearchProductsBuilder
    {
        private ICollection<InputDataProductEntry> _inputDataProductEntries;
        private string _outputPath;

        public ElasticsearchProductsBuilder WithInputJsonData(ICollection<InputDataProductEntry> inputDataProductEntries)
        {
            _inputDataProductEntries = inputDataProductEntries;
            return this;
        }

        public ElasticsearchProductsBuilder WithOutputPath(string outputPath)
        {
            _outputPath = outputPath;
            return this;
        }

        public void BuildAndSave()
        {
            Validate();
            var output = new List<ProductForIndex>();
            Log.Logger.Information($"Number of records found for processing: {_inputDataProductEntries.Count}");
            foreach (InputDataProductEntry inputDataProductEntry in _inputDataProductEntries)
            {
                var outputElement = new ProductForIndex
                {
                    SearchResultData = new SearchResultData
                    {
                        Id = inputDataProductEntry.ProductId,
                        Name = inputDataProductEntry.ProductName,
                        Category = inputDataProductEntry.CategoryName,
                        Supplier = inputDataProductEntry.Supplier,
                        NumberOfProducts = inputDataProductEntry.UnitsInStock,
                        QuantityPerUnit = inputDataProductEntry.QuantityPerUnit
                    },
                    SearchData = new SearchData
                    {
                        FullText = string.Join(
                            ' ',
                            " ",
                            inputDataProductEntry.ProductId.ToString(),
                            inputDataProductEntry.ProductName,
                            inputDataProductEntry.CategoryName,
                            inputDataProductEntry.Supplier),
                        StringFacet = new List<Facet<string>>
                        {
                            new() {FacetName = "supplier", FacetValue = inputDataProductEntry.Supplier},
                            new() {FacetName = "category", FacetValue = inputDataProductEntry.CategoryName}
                        },
                        NumberFacet = new List<Facet<double>>
                        {
                            new() {FacetName = "gross_price", FacetValue = inputDataProductEntry.UnitPrice}
                        }
                    },
                    SuggestionTerms = new List<string> {inputDataProductEntry.ProductName},
                    NumberSort = new NumberSort
                    {
                        GrossPrice = inputDataProductEntry.UnitPrice
                    },
                    StringSort = new StringSort
                    {
                        Name = inputDataProductEntry.ProductName
                    }
                };

                var completionTerms = new List<string>();
                AddSplitValueToCompletionTerms(inputDataProductEntry.ProductName, completionTerms);
                AddSplitValueToCompletionTerms(inputDataProductEntry.CategoryName, completionTerms);
                AddSplitValueToCompletionTerms(inputDataProductEntry.Supplier, completionTerms);

                outputElement.CompletionTerms = completionTerms;
                output.Add(outputElement);
                
                Log.Logger.Information($"'{inputDataProductEntry.ProductName}' successfully processed");
            }
            
            SaveResultsToFile(output);
            Log.Logger.Information("Output file saved");
        }

        private void SaveResultsToFile(List<ProductForIndex> output)
        {
            string jsonText = JsonConvert.SerializeObject(output);
            File.WriteAllText(_outputPath, jsonText);
        }

        private static void AddSplitValueToCompletionTerms(string text, List<string> completionTerms)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return;
            }

            string[] split = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (split.Length == 0)
            {
                return;
            }

            var itemsToBeAdded = split.ToList().Where(x => !completionTerms.Contains(x)).ToList();
            if (itemsToBeAdded.Count == 0)
            {
                return;
            }
            
            completionTerms.AddRange(itemsToBeAdded);
        }

        private void Validate()
        {
            if (string.IsNullOrWhiteSpace(_outputPath))
            {
                throw new ArgumentException("Output file path was not provided");
            }

            if (_inputDataProductEntries == null || _inputDataProductEntries.Count == 0)
            {
                throw new ArgumentException("Input products collection is empty or not set");
            }
        }
    }
}