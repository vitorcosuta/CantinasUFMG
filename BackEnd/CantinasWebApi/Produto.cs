using System.ComponentModel.DataAnnotations.Schema;

namespace CantinasWebApi
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public int idOwner { get; set; }
    }
} 