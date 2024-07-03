using Microsoft.AspNetCore.Mvc;
using ReactAspCRUD.Models;
using System.Linq;
using System.Threading.Tasks;
using BCrypt.Net; 

namespace ReactAspCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly StudentDbContext _context;

        public UsersController(StudentDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    FirstName = userDTO.FirstName,
                    LastName = userDTO.LastName,
                    Email = userDTO.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password) 
                };

                _context.User.Add(user);
                await _context.SaveChangesAsync();
                return Ok(new { message = "User registered successfully" });
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO loginDTO)
        {
            var user = _context.User.SingleOrDefault(u => u.Email == loginDTO.Email);
            if (user != null && BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                return Ok(new { success = true, message = "Login successful" });
            }
            return Unauthorized(new { success = false, message = "Invalid credentials" });
        }
    }
}
