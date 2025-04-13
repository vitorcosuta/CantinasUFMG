using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CantinasWebApi.Data; // Assuming DataContext is here
using CantinasWebApi; // Assuming Lanchonete model is here

namespace CantinasWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LanchonetesController : ControllerBase
    {
        private readonly DataContext _context;

        public LanchonetesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Lanchonetes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Lanchonete>>> GetLanchonetes()
        {
            return await _context.Lanchonetes.Include(l => l.Produtos).ToListAsync(); // Include products
        }

        // GET: api/Lanchonetes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Lanchonete>> GetLanchonete(int id)
        {
            var lanchonete = await _context.Lanchonetes.Include(l => l.Produtos).FirstOrDefaultAsync(l => l.Id == id); // Include products

            if (lanchonete == null)
            {
                return NotFound();
            }

            return lanchonete;
        }

        // POST: api/Lanchonetes
        [HttpPost]
        public async Task<ActionResult<Lanchonete>> PostLanchonete(Lanchonete lanchonete)
        {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }
            _context.Lanchonetes.Add(lanchonete);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLanchonete), new { id = lanchonete.Id }, lanchonete);
        }

        // PUT: api/Lanchonetes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLanchonete(int id, Lanchonete lanchonete)
        {
            if (id != lanchonete.Id)
            {
                return BadRequest();
            }

             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

            _context.Entry(lanchonete).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LanchoneteExists(id))
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

        // DELETE: api/Lanchonetes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLanchonete(int id)
        {
            var lanchonete = await _context.Lanchonetes.FindAsync(id);
            if (lanchonete == null)
            {
                return NotFound();
            }

            // Consider cascade delete implications or handle related entities (Produtos)
            // For now, simple delete:
            _context.Lanchonetes.Remove(lanchonete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LanchoneteExists(int id)
        {
            return _context.Lanchonetes.Any(e => e.Id == id);
        }
    }
} 