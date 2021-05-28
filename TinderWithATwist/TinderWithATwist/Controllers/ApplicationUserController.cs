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
        public async Task<ActionResult<ApplicationUser>> PutApplicationUser(string id, string base64Image, string likedId)
        {
            ApplicationUser databaseUser = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();

            if (databaseUser == null || id == null)
            {
                return NotFound();
            }

            databaseUser.ProfilePicture = base64Image;


            if (likedId != null)
            {
                ApplicationUser likedUser = await _context.Users.Where(liked => liked.Id == likedId).FirstOrDefaultAsync();

                if (likedUser == null)
                {
                    return NotFound();
                }

                databaseUser.LikedUsers.Add(likedUser);
            }

            await _context.SaveChangesAsync();
            return Ok();

        }

        //[HttpPut("{id}")]
        //public async Task<ActionResult<ApplicationUser>> PutLikedUsers(string id, string likedId)
        //{
        //    ApplicationUser databaseUser = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();
        //    ApplicationUser likedUser = await _context.Users.Where(liked => liked.Id == likedId).FirstOrDefaultAsync();
        //    //ApplicationUser user = await _context.Users.Where(u => u.Id == likedUser.Id).FirstOrDefaultAsync();

        //    //if (databaseUser == null || likedUser == null || id == null || likedId == null)
        //    //{
        //    //    return NotFound();
        //    //}

        //    databaseUser.LikedUsers.Add(likedUser);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}
    }
}
