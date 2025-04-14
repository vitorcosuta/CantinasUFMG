namespace CantinasWebApi
{
    public class Lanchonete
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public double posX { get; set; }
        public double posY { get; set; }
        public int idOwner { get; set; }
    }
} 