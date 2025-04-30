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
        public DbSet<Avaliacao> Avaliacoes => Set<Avaliacao>();
        public DbSet<ProdutoLanchonete> ProdutosLanchonete => Set<ProdutoLanchonete>();
        public DbSet<Favorito> Favoritos => Set<Favorito>();
    }
}
