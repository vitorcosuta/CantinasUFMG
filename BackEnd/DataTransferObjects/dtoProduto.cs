namespace DataTransferObjects
{
    public class dtoProduto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;

        //Propriedades adicionais
        public List<dtoLanchonete>? Lanchonetes { get; set; }
    }
}
