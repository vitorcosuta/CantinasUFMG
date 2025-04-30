using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTransferObjects;

namespace CantinasWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FavoritoController : ControllerBase
    {
        private readonly DataContext _context;

        public FavoritoController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<dtoFavorito>>> CreateFavorito(Favorito favorito)
        {
            _context.Favoritos.Add(favorito);
            await _context.SaveChangesAsync();

            var favoritos = await _context.Favoritos.ToListAsync();
            var dtoFavoritos = new List<dtoFavorito>();
            foreach (var item in favoritos)
            {
                dtoFavoritos.Add(new dtoFavorito()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    LanchoneteId = item.LanchoneteId
                });
            }

            return Ok(dtoFavoritos);
        }

        [HttpGet]
        public async Task<ActionResult<List<dtoFavorito>>> GetAllFavoritos()
        {
            var favoritos = await _context.Favoritos.ToListAsync();
            var dtoFavoritos = new List<dtoFavorito>();
            foreach (var item in favoritos)
            {
                dtoFavoritos.Add(new dtoFavorito()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    LanchoneteId = item.LanchoneteId
                });
            }

            return Ok(dtoFavoritos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dtoFavorito>> GetFavorito(int id)
        {
            var favorito = await _context.Favoritos.FindAsync(id);

            if(favorito == null)
            {
                return BadRequest("Favorito não encontrado.");
            }

            var dtoFavorito = new dtoFavorito()
            {
                Id = favorito.Id,
                UserId = favorito.UserId,
                LanchoneteId = favorito.LanchoneteId
            };

            return Ok(dtoFavorito);
        }
    }
} 