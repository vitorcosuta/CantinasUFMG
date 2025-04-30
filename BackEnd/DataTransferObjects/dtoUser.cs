

namespace DataTransferObjects
{
    public class dtoUser
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public bool IsAdmin { get; set; }

        public string Photo { get; set; } = string.Empty;


        //Propriedades adicionais
        public List<dtoLanchonete>? LanchonetesFavoritas { get; set; }
    }
}
