using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTransferObjects;

namespace CantinasWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoLanchoneteController : ControllerBase
    {
        private readonly DataContext _context;

        public ProdutoLanchoneteController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<dtoProdutoLanchonete>>> CreateProdutoLanchonete(ProdutoLanchonete produtoLanchonete)
        {
            _context.ProdutosLanchonete.Add(produtoLanchonete);
            await _context.SaveChangesAsync();

            var produtosLanchonete = await _context.ProdutosLanchonete.ToListAsync();
            var dtoProdutosLanchonete = new List<dtoProdutoLanchonete>();
            foreach (var item in produtosLanchonete)
            {
                dtoProdutosLanchonete.Add(new dtoProdutoLanchonete()
                {
                    Id = item.Id,
                    IdProduto = item.IdProduto,
                    IdLanchonete = item.IdLanchonete,
                    Preco = item.Preco
                });
            }

            return Ok(dtoProdutosLanchonete);
        }

        [HttpGet]
        public async Task<ActionResult<List<dtoProdutoLanchonete>>> GetAllProdutosLanchonete()
        {
            var produtosLanchonete = await _context.ProdutosLanchonete.ToListAsync();
            var dtoProdutosLanchonete = new List<dtoProdutoLanchonete>();
            foreach (var item in produtosLanchonete)
            {
                dtoProdutosLanchonete.Add(new dtoProdutoLanchonete()
                {
                    Id = item.Id,
                    IdProduto = item.IdProduto,
                    IdLanchonete = item.IdLanchonete,
                    Preco = item.Preco
                });
            }

            return Ok(dtoProdutosLanchonete);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dtoProdutoLanchonete>> GetProdutoLanchonete(int id)
        {
            var produtoLanchonete = await _context.ProdutosLanchonete.FindAsync(id);

            if(produtoLanchonete == null)
            {
                return BadRequest("Produto da lanchonete não encontrado.");
            }

            var dtoProdutoLanchonete = new dtoProdutoLanchonete()
            {
                Id = produtoLanchonete.Id,
                IdProduto = produtoLanchonete.IdProduto,
                IdLanchonete = produtoLanchonete.IdLanchonete,
                Preco = produtoLanchonete.Preco
            };

            return Ok(dtoProdutoLanchonete);
        }
    }
} 