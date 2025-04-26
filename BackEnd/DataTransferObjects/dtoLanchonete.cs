namespace DataTransferObjects
{
    public class dtoLanchonete
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public double posX { get; set; }
        public double posY { get; set; }
        public int idOwner { get; set; }

        public dtoUser? Owner { get; set; }

        public List<dtoProduto>? Produtos { get; set; }
    }
}
