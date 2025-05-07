using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;
using DataTransferObjects;

namespace CantinasWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProdutoController : ControllerBase
    {

        private readonly DataContext _context;

        public ProdutoController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<dtoProduto>>> CreateProduto(Produto Produto)
        {
            _context.Produtos.Add(Produto);
            await _context.SaveChangesAsync();

            var Produtos = await _context.Produtos.ToListAsync();
            var dtoProdutos = new List<dtoProduto>();
            foreach(var produto in Produtos)
            {
                dtoProdutos.Add(new dtoProduto()
                {
                    Id = produto.Id,
                    Nome = produto.Nome,
                    Descricao = produto.Descricao,
                    idOwner = produto.idOwner,
                });
            }

            return Ok(dtoProdutos);
        }

        [HttpPost("UpdateProduto")]
        public async Task<ActionResult<dtoProduto>> UpdateProduto(Produto produto)
        {
            var Produto = await _context.Produtos.FindAsync(produto.Id);

            if (Produto == null)
            {
                return BadRequest("Produto does not exist.");
            }

            Produto.Nome = produto.Nome;
            Produto.Descricao = produto.Descricao;
            Produto.idOwner = produto.idOwner;

            await _context.SaveChangesAsync();

            return Ok(new dtoProduto()
            {
                Id = Produto.Id,
                Nome = Produto.Nome,
                Descricao = Produto.Descricao,
                idOwner = Produto.idOwner,
            });
        }

        [HttpPost("DeleteProduto")]
        public async Task<ActionResult<dtoProduto>> DeleteProduto(Produto produto)
        {
            var Produto = await _context.Produtos.FindAsync(produto.Id);

            if (Produto == null)
            {
                return BadRequest("Produto does not exist.");
            }

            _context.Produtos.Remove(Produto);

            var produtosLanchonete = _context.ProdutosLanchonete.Where(x => x.IdProduto == produto.Id);

            if(produtosLanchonete != default)
            {
                _context.ProdutosLanchonete.RemoveRange(produtosLanchonete);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<List<dtoProduto>>> GetAllProdutos()
        {
            var Produtos = await _context.Produtos.ToListAsync();
            var dtoProdutos = new List<dtoProduto>();
            foreach (var produto in Produtos)
            {
                dtoProdutos.Add(new dtoProduto()
                {
                    Id = produto.Id,
                    Nome = produto.Nome,
                    Descricao = produto.Descricao,
                    idOwner = produto.idOwner,
                });
            }

            return Ok(dtoProdutos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dtoProduto>> GetProduto(int id)
        {
            var Produto = await _context.Produtos.FindAsync(id);

            if(Produto == null)
            {
                return BadRequest("Produto does not exist.");
            }

            var dtoProduto = new dtoProduto()
            {
                Id = Produto.Id,
                Nome = Produto.Nome,
                Descricao = Produto.Descricao,
                idOwner = Produto.idOwner,
            };
            
            return Ok(dtoProduto);
        }

        [HttpGet("GetProdutoByName/{name}")]
        public async Task<ActionResult<List<dtoProduto>>> GetProdutosByName(string name)
        {
            var Produtos = await _context.Produtos.Where(x => x.Nome.Contains(name)).ToListAsync();
            var dtoProdutos = new List<dtoProduto>();
            foreach (var produto in Produtos)
            {
                dtoProdutos.Add(new dtoProduto()
                {
                    Id = produto.Id,
                    Nome = produto.Nome,
                    Descricao = produto.Descricao,
                    idOwner = produto.idOwner,
                });
            }

            return Ok(dtoProdutos);
        }
    }
}
