using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

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
        public async Task<ActionResult<List<Produto>>> CreateProduto(Produto Produto)
        {
            _context.Produtos.Add(Produto);
            await _context.SaveChangesAsync();

            return Ok(await _context.Produtos.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<Produto>>> GetAllProdutos()
        {
            return Ok(await _context.Produtos.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProduto(int id)
        {
            var Produto = await _context.Produtos.FindAsync(id);

            if(Produto == null)
            {
                return BadRequest("Produto does not exist.");
            }
            return Ok(Produto);
        }
    }
}
