using CantinasWebApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Formats.Asn1;
using DataTransferObjects;

namespace CantinasWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly DataContext _context;

        public UserController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<dtoUser>> CreateUser(User user)
        {
            
            if(await _context.Users.AnyAsync(x => x.Email == user.Email))
            {
                return BadRequest("Usuário já existente.");
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var User = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);

            if(User == null)
            {
                return NotFound("Erro ao criar usuário");
            }

            return Ok(new dtoUser()
            {
                Id = User.Id,
                Email = User.Email,
                Username = User.Username,
                IsAdmin = User.IsAdmin,
                Photo = User.Photo,
            });
        }

        [HttpPost("AssertUser")]
        public async Task<ActionResult<dtoUser>> AssertUser(User user)
        {
            var User = await _context.Users.FirstOrDefaultAsync(x => x.Email == user.Email);

            if (User == default || User?.Password != user.Password)
            {
                return StatusCode(403);
            }

            return Ok(new dtoUser()
            {
                Id = User.Id,
                Email = User.Email,
                Username = User.Username,
                IsAdmin = User.IsAdmin,
                Photo = User.Photo,
            });
        }

        [HttpPost("UpdateUser")]
        public async Task<ActionResult<dtoUser>> UpdateUser(User user)
        {
            var User = await _context.Users.FindAsync(user.Id);

            if (User == default)
            {
                return StatusCode(403);
            }

            if(user.Email != User.Email)
            {
                return BadRequest("Não é possível alterar o e-mail.");
            }

            User.Username = user.Username;
            User.Password = user.Password;
            User.IsAdmin = user.IsAdmin;
            User.Photo = user.Photo;

            await _context.SaveChangesAsync();

            return Ok(new dtoUser()
            {
                Id = User.Id,
                Email = User.Email,
                Username = User.Username,
                IsAdmin = User.IsAdmin,
                Photo = User.Photo,
            });
        }

        [HttpPost("SetAdmin")]
        public async Task<ActionResult<dtoUser>> SetAdmin(User user)
        {
            var User = await _context.Users.FindAsync(user.Id);

            if (User == default)
            {
                return NotFound("Usuário não encontrado.");
            }

            User.IsAdmin = true;
            await _context.SaveChangesAsync();

            return Ok(new dtoUser()
            {
                Id = User.Id,
                Email = User.Email,
                Username = User.Username,
                IsAdmin = User.IsAdmin,
                Photo = User.Photo,
            });
        }

        [HttpGet]
        public async Task<ActionResult<List<dtoUser>>> GetAllUsers()
        {
            List<dtoUser> dtoUsers = new List<dtoUser>();
            var Users = await _context.Users.ToListAsync();

            foreach(var user in Users)
            {
                dtoUsers.Add(new dtoUser()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Username = user.Username,
                    IsAdmin = user.IsAdmin,
                });
            }

            return Ok(dtoUsers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<dtoUser>> GetUser(int id)
        {
            var User = await _context.Users.FindAsync(id);


            if(User == null)
            {
                return BadRequest("User does not exist.");
            }

            var IdLanchonetesFavoritas = await _context.Favoritos.Where(x => x.UserId == id).Select(x => x.LanchoneteId).ToListAsync();

            var lanchonetes = await _context.Lanchonetes.Where(x => IdLanchonetesFavoritas.Contains(x.Id)).ToListAsync();
            var dtoLanchonetes = new List<dtoLanchonete>();
            foreach(var lanchonete in lanchonetes)
            {
                dtoLanchonetes.Add(new dtoLanchonete() 
                {
                    Id = lanchonete.Id,
                    Nome = lanchonete.Nome,
                    posX = lanchonete.posX,
                    posY = lanchonete.posY,
                });
            }

            var dtoUser = new dtoUser()
            {
                Id = User.Id,
                Email = User.Email,
                Username= User.Username,
                IsAdmin = User.IsAdmin,
                Photo = User.Photo,
                LanchonetesFavoritas = dtoLanchonetes,
            };

            return Ok(dtoUser);
        }
    }
}
