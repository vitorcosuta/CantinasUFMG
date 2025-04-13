using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;

namespace CantinasWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LanchoneteController : ControllerBase
    {

        private readonly DataContext _context;

        public LanchoneteController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<Lanchonete>>> CreateLanchonete(Lanchonete lanchonete)
        {
            _context.Lanchonetes.Add(lanchonete);
            await _context.SaveChangesAsync();

            return Ok(await _context.Lanchonetes.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<Lanchonete>>> GetAllLanchonetes()
        {
            return Ok(await _context.Lanchonetes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Lanchonete>> GetLanchonete(int id)
        {
            var Lanchonete = await _context.Lanchonetes.FindAsync(id);

            if(Lanchonete == null)
            {
                return BadRequest("Lanchonete does not exist.");
            }
            return Ok(Lanchonete);
        }
    }
}
