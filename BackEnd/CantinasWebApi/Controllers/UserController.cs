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
        public async Task<ActionResult<List<dtoUser>>> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
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

            var dtoUser = new dtoUser()
            {
                Id = User.Id,
                Email = User.Email,
                Username= User.Username,
                IsAdmin = User.IsAdmin,
                Photo = User.Photo,
            };

            return Ok(dtoUser);
        }
    }
}
