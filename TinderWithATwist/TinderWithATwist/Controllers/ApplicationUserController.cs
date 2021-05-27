using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;



namespace TinderWithATwist
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ApplicationUserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id, bool getRandomUser)
        {
            if (getRandomUser)
            {
                Random random = new();
                var userCount = _context.Users.Count();
                var randomNumber = random.Next(0, userCount - 1);
                ApplicationUser randomUser = await _context.Users.Where(u => u.Id != id).Skip(randomNumber).Take(1).FirstOrDefaultAsync();

                ApplicationUser randomUserInfo = new ApplicationUser
                {
                    Id = randomUser.Id,
                    Email = randomUser.Email,
                    ProfilePicture = randomUser.ProfilePicture
                };


                return Ok(randomUserInfo);
            }

            ApplicationUser user = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user != null)
            {
                ApplicationUser userInfo = new ApplicationUser
                {
                    Id = user.Id,
                    Email = user.Email,
                    ProfilePicture = user.ProfilePicture
                };

                return Ok(userInfo);
            }

            return NotFound();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ApplicationUser>> PutApplicationUser(string id, [FromBody] string base64Image)
        {
            ApplicationUser databaseUser = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();

            if (databaseUser == null || id == null)
            {
                return NotFound();
            }

            databaseUser.ProfilePicture = base64Image;

            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
