namespace DataTransferObjects
{
    public class dtoUpdateUser
    {
        public int Id { get; set; }
        public string? NewUsername { get; set; }
        public string Password { get; set; } = string.Empty;
        public string? NewPassword { get; set; }
        public string? Photo { get; set; }
    }
}
