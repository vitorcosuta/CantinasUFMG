namespace CantinasWebApi
{
    public class Lanchonete
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? Localizacao { get; set; } // Optional location details
        public double AvaliacaoMedia { get; set; } = 0.0; // Average rating, default 0
        public List<Produto> Produtos { get; set; } = new List<Produto>(); // Navigation property for related products
    }
} 