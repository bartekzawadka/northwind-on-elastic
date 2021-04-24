namespace Tool.ElasticSeedBuilder.Models
{
    public class InputDataProductEntry
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; }

        public string Supplier { get; set; }

        public string CategoryName { get; set; }

        public string QuantityPerUnit { get; set; }

        public double UnitPrice { get; set; }

        public int UnitsInStock { get; set; }
    }
}