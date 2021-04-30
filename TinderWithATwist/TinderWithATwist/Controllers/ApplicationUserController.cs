using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


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
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id)
        {
            ApplicationUser user = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();

            if (user != null)
            {
                ApplicationUser userInfo = new ApplicationUser
                {
                    Id = user.Id,
                    
                };

                return Ok(userInfo);
            }

            return NotFound();
        }

        [HttpPut]
        public async Task<ActionResult<ApplicationUser>> PutApplicationUser([FromBody] ApplicationUser applicationUser)
        {
            ApplicationUser databaseUser = await _context.Users.Where(user => user.Id == applicationUser.Id).FirstOrDefaultAsync();

            if (databaseUser == null || applicationUser == null)
            {
                return NotFound();
            }

            //if (applicationUser.CurrentPuzzle != null)
            //{
            //    SentencePuzzle sentencePuzzle = await _context.SentencePuzzles.
            //        Where(puzzle => puzzle.ID == applicationUser.CurrentPuzzle.ID).
            //        FirstOrDefaultAsync();

            //    if (sentencePuzzle != null)
            //    {
            //        databaseUser.CurrentPuzzle = sentencePuzzle;
            //    }
            //}
            
            //if (applicationUser.Points > 0)
            //{
            //    databaseUser.Points = applicationUser.Points;
            //}

            await _context.SaveChangesAsync();
            return Ok(applicationUser);
        }
    }
}
