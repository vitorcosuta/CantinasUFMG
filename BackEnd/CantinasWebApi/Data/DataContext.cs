using Microsoft.EntityFrameworkCore;

namespace CantinasWebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) 
        {
        
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<Lanchonete> Lanchonetes => Set<Lanchonete>();
        public DbSet<Produto> Produtos => Set<Produto>();
    }
}
