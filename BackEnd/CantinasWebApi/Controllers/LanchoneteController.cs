using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;
using DataTransferObjects;

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
        public async Task<ActionResult<List<dtoLanchonete>>> CreateLanchonete(Lanchonete Lanchonete)
        {
            _context.Lanchonetes.Add(Lanchonete);
            await _context.SaveChangesAsync();

            var Lanchonetes = await _context.Lanchonetes.ToListAsync();
            var dtoLanchonetes = new List<dtoLanchonete>();
            foreach (var lanchonete in Lanchonetes)
            {
                dtoLanchonetes.Add(new dtoLanchonete()
                {
                    Id = lanchonete.Id,
                    Nome = lanchonete.Nome,
                    posX = lanchonete.posX,
                    posY = lanchonete.posY,
                    idOwner = lanchonete.idOwner,

                });
            }


            return Ok(dtoLanchonetes);
        }

        [HttpGet]
        public async Task<ActionResult<List<dtoLanchonete>>> GetAllLanchonetes()
        {
            var Lanchonetes = await _context.Lanchonetes.ToListAsync();
            var dtoLanchonetes = new List<dtoLanchonete>();
            foreach (var lanchonete in Lanchonetes)
            {
                dtoLanchonetes.Add(new dtoLanchonete()
                {
                    Id = lanchonete.Id,
                    Nome = lanchonete.Nome,
                    posX = lanchonete.posX,
                    posY = lanchonete.posY,
                    idOwner = lanchonete.idOwner,

                });
            }

            return Ok(dtoLanchonetes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dtoLanchonete>> GetLanchonete(int id)
        {
            var Lanchonete = await _context.Lanchonetes.FindAsync(id);

            if(Lanchonete == null)
            {
                return BadRequest("Lanchonete does not exist.");
            }

            var dtoAvaliacoes = new List<dtoAvaliacao>();
            var Avaliacoes = await _context.Avaliacoes.Where(x => x.LanchoneteId == id).ToListAsync();

            foreach(var avaliacao in Avaliacoes)
            {
                dtoAvaliacoes.Add(new dtoAvaliacao()
                {
                    Id=avaliacao.Id,
                    UserId = avaliacao.UserId,
                    LanchoneteId = avaliacao.LanchoneteId,
                    Nota = avaliacao.Nota,
                });
            }

            double? AvaliacaoMedia = dtoAvaliacoes.Average(x => x.Nota);

            var dtoLanchonete = new dtoLanchonete()
            {
                Id = Lanchonete.Id,
                Nome = Lanchonete.Nome,
                posX = Lanchonete.posX,
                posY = Lanchonete.posY,
                idOwner = Lanchonete.idOwner,
                AvaliacaoMedia = AvaliacaoMedia,
                Avaliacoes = dtoAvaliacoes,
            };

            return Ok(dtoLanchonete);
        }
    }
}
