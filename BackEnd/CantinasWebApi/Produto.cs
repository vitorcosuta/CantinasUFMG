using System.ComponentModel.DataAnnotations.Schema;

namespace CantinasWebApi
{
    public class Produto
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public string? Descricao { get; set; } // Optional description
        [Column(TypeName = "decimal(18, 2)")] // Define precision for price
        public decimal Preco { get; set; }
        public double AvaliacaoMedia { get; set; } = 0.0; // Average rating, default 0

        // Foreign Key relationship
        public int LanchoneteId { get; set; }
        public Lanchonete? Lanchonete { get; set; } // Navigation property
    }
} 