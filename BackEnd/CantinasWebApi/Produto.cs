using System.ComponentModel.DataAnnotations.Schema;

namespace CantinasWebApi
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; } 
    }
} 