using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CantinasWebApi.Data; // Assuming DataContext is here
using CantinasWebApi; // Assuming Produto model is here

namespace CantinasWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly DataContext _context;

        public ProdutosController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            // Optionally filter by LanchoneteId if needed: Request.Query["lanchoneteId"]
            return await _context.Produtos.ToListAsync();
        }

        // GET: api/Produtos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                return NotFound();
            }

            return produto;
        }

         // GET: api/Produtos/PorLanchonete/5
        [HttpGet("PorLanchonete/{lanchoneteId}")]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutosPorLanchonete(int lanchoneteId)
        {
            var produtos = await _context.Produtos
                                        .Where(p => p.LanchoneteId == lanchoneteId)
                                        .ToListAsync();

            if (produtos == null || !produtos.Any())
            {
                return NotFound($"Nenhum produto encontrado para a lanchonete com ID {lanchoneteId}.");
            }

            return produtos;
        }


        // POST: api/Produtos
        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto(Produto produto)
        {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

            // Check if Lanchonete exists
            var lanchoneteExists = await _context.Lanchonetes.AnyAsync(l => l.Id == produto.LanchoneteId);
            if (!lanchoneteExists)
            {
                // Optionally add a model error instead of just returning BadRequest
                return BadRequest($"Lanchonete with Id {produto.LanchoneteId} not found.");
            }

            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }

        // PUT: api/Produtos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduto(int id, Produto produto)
        {
            if (id != produto.Id)
            {
                return BadRequest();
            }

             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             // Check if Lanchonete exists before update
            var lanchoneteExists = await _context.Lanchonetes.AnyAsync(l => l.Id == produto.LanchoneteId);
            if (!lanchoneteExists)
            {
                 return BadRequest($"Lanchonete with Id {produto.LanchoneteId} not found.");
            }


            _context.Entry(produto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Produtos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
} 