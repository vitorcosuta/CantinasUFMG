using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataTransferObjects;

namespace CantinasWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AvaliacaoController : ControllerBase
    {
        private readonly DataContext _context;

        public AvaliacaoController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<dtoAvaliacao>>> CreateAvaliacao(Avaliacao avaliacao)
        {
            _context.Avaliacoes.Add(avaliacao);
            await _context.SaveChangesAsync();

            var avaliacoes = await _context.Avaliacoes.ToListAsync();
            var dtoAvaliacoes = new List<dtoAvaliacao>();
            foreach (var item in avaliacoes)
            {
                dtoAvaliacoes.Add(new dtoAvaliacao()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    LanchoneteId = item.LanchoneteId,
                    Nota = item.Nota
                });
            }

            return Ok(dtoAvaliacoes);
        }

        [HttpGet]
        public async Task<ActionResult<List<dtoAvaliacao>>> GetAllAvaliacoes()
        {
            var avaliacoes = await _context.Avaliacoes.ToListAsync();
            var dtoAvaliacoes = new List<dtoAvaliacao>();
            foreach (var item in avaliacoes)
            {
                dtoAvaliacoes.Add(new dtoAvaliacao()
                {
                    Id = item.Id,
                    UserId = item.UserId,
                    LanchoneteId = item.LanchoneteId,
                    Nota = item.Nota
                });
            }

            return Ok(dtoAvaliacoes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dtoAvaliacao>> GetAvaliacao(int id)
        {
            var avaliacao = await _context.Avaliacoes.FindAsync(id);

            if(avaliacao == null)
            {
                return BadRequest("Avaliação não encontrada.");
            }

            var dtoAvaliacao = new dtoAvaliacao()
            {
                Id = avaliacao.Id,
                UserId = avaliacao.UserId,
                LanchoneteId = avaliacao.LanchoneteId,
                Nota = avaliacao.Nota
            };

            return Ok(dtoAvaliacao);
        }
    }
} 