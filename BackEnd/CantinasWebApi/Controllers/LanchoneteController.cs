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

        [HttpPost("UpdateLanchonete")]
        public async Task<ActionResult<dtoLanchonete>> UpdateLanchonete(Lanchonete lanchonete)
        {
            var Lanchonete = await _context.Lanchonetes.FindAsync(lanchonete.Id);

            if (Lanchonete == null)
            {
                return BadRequest("Lanchonete does not exist.");
            }

            Lanchonete.Nome = lanchonete.Nome;
            Lanchonete.posX = lanchonete.posX;
            Lanchonete.posY = lanchonete.posY;
            Lanchonete.idOwner = lanchonete.idOwner;

            await _context.SaveChangesAsync();

            return Ok(new dtoLanchonete()
            {
                Id = Lanchonete.Id,
                Nome = Lanchonete.Nome,
                posX = Lanchonete.posX,
                posY = Lanchonete.posY,
                idOwner = Lanchonete.idOwner,
            });
        }

        [HttpPost("DeleteLanchonete")]
        public async Task<ActionResult<dtoLanchonete>> DeleteLanchonete(Lanchonete lanchonete)
        {
            var Lanchonete = await _context.Lanchonetes.FindAsync(lanchonete.Id);

            if (Lanchonete == null)
            {
                return BadRequest("Lanchonete does not exist.");
            }

            _context.Lanchonetes.Remove(Lanchonete);

            var produtosLanchonete = _context.ProdutosLanchonete.Where(x => x.IdLanchonete == lanchonete.Id);
            if(produtosLanchonete != default)
            {
                _context.ProdutosLanchonete.RemoveRange(produtosLanchonete);
            }

            var favoritos = _context.Favoritos.Where(x => x.LanchoneteId == lanchonete.Id);
            if (favoritos != default)
            {
                _context.Favoritos.RemoveRange(favoritos);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }



        [HttpGet]
        public async Task<ActionResult<List<dtoLanchonete>>> GetAllLanchonetes()
        {
            var Lanchonetes = await _context.Lanchonetes.ToListAsync();
            var dtoLanchonetes = new List<dtoLanchonete>();
            foreach (var lanchonete in Lanchonetes)
            {
                var user = await _context.Users.FindAsync(lanchonete.idOwner);

                var avaliacoes = await _context.Avaliacoes
                    .Where(a => a.LanchoneteId == lanchonete.Id)
                    .ToListAsync();

                double? avaliacaoMedia = avaliacoes.Count > 0
                    ? avaliacoes.Select(a => a.Nota).Average()
                    : 0;

                var produtosLanchonete = await _context.ProdutosLanchonete
                    .Where(p => p.IdLanchonete == lanchonete.Id)
                    .ToListAsync();

                var precos = produtosLanchonete.ToDictionary(p => p.IdProduto, p => p.Preco);

                var produtos = await _context.Produtos
                    .Where(p => precos.Keys.Contains(p.Id))
                    .ToListAsync();

                var dtoProdutos = new List<dtoProduto>();
                foreach (var produto in produtos)
                {
                    dtoProdutos.Add(new dtoProduto
                    {
                        Id = produto.Id,
                        Nome = produto.Nome,
                        Descricao = produto.Descricao,
                        idOwner = produto.idOwner,
                        Preco = precos[produto.Id]
                    });
                }

                dtoLanchonetes.Add(new dtoLanchonete()
                {
                    Id = lanchonete.Id,
                    Nome = lanchonete.Nome,
                    posX = lanchonete.posX,
                    posY = lanchonete.posY,
                    idOwner = lanchonete.idOwner,
                    AvaliacaoMedia = avaliacaoMedia,
                    Owner = user == null ? null : new dtoUser
                    {
                        Id = user.Id,
                        Username = user.Username,
                        Email = user.Email
                    },
                    Produtos = dtoProdutos
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

            //Calcular media de avalia��o da lanchonete
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
                    idOwner = produto.idOwner,
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
