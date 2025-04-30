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

            //Obter Lista de avaliacoes da lanchonete
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

            //Calcular media de avaliação da lanchonete
            double? AvaliacaoMedia = dtoAvaliacoes?.Count > 0 ? dtoAvaliacoes?.Select(x => x.Nota)?.Average() : 0;

            //Obter lista de produtos na lanchonete
            var ProdutosLanchonete = await _context.ProdutosLanchonete.Where(x => x.IdLanchonete == id).ToListAsync();
            var PrecoProdutos = ProdutosLanchonete.ToDictionary(x => x.IdProduto, y => y.Preco);
            var produtos = await _context.Produtos.Where(x => PrecoProdutos.Keys.Contains(x.Id)).ToListAsync();
            var dtoProdutos = new List<dtoProduto>();
            foreach(var produto in produtos)
            {
                dtoProdutos.Add(new dtoProduto()
                {
                    Id = produto.Id,
                    Nome = produto.Nome,
                    Descricao = produto.Descricao,
                    Preco = PrecoProdutos[produto.Id],
                });
            }

            var dtoLanchonete = new dtoLanchonete()
            {
                Id = Lanchonete.Id,
                Nome = Lanchonete.Nome,
                posX = Lanchonete.posX,
                posY = Lanchonete.posY,
                idOwner = Lanchonete.idOwner,
                AvaliacaoMedia = AvaliacaoMedia,
                Avaliacoes = dtoAvaliacoes,
                Produtos = dtoProdutos,
            };

            return Ok(dtoLanchonete);
        }
    }
}
