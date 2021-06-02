using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

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
        public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id, bool getRandomUser, bool getLikedUsers)
        {
            if (getRandomUser)
            {
                Random random = new();
                var userCount = _context.Users.Count();
                var randomNumber = random.Next(0, userCount - 1);
                ApplicationUser randomUser = await _context.Users.Where(u => u.Id != id).Skip(randomNumber).Take(1).FirstOrDefaultAsync();

                ApplicationUser randomUserInfo = new()
                {
                    Id = randomUser.Id,
                    Email = randomUser.Email,
                    ProfilePicture = randomUser.ProfilePicture
                };

                return Ok(randomUserInfo);
            }

            ApplicationUser user = await _context.Users.Where(u => u.Id == id).FirstOrDefaultAsync();
            if (getLikedUsers)
            {
                var idUser = await _context.Users.Include(user => user.LikedUsers).ThenInclude(row => row.LikedUsers).FirstOrDefaultAsync(u => u.Id == user.Id);

                List<ApplicationUser> likedUsers = new();
                List<ApplicationUser> likedByUsers = new();

                foreach (ApplicationUser likedUser in idUser.LikedUsers)
                {
                    ApplicationUser likedUserInfo = new()
                    {
                        Email = likedUser.Email
                    };
                    likedUsers.Add(likedUserInfo);
                }

                foreach (var likedByUser in idUser.LikedByUsers)
                {
                    ApplicationUser likedByUserInfo = new()
                    {
                        Email = likedByUser.Email
                    };
                    likedByUsers.Add(likedByUserInfo);
                }

                ApplicationUser idUserInfo = new()
                {
                    Id = idUser.Id,
                    Email = idUser.Email,
                    LikedUsers = likedUsers,
                    LikedByUsers = likedByUsers
                };

                var query =
                    from a in likedUsers
                    join b in likedByUsers on a.Email equals b.Email
                    select a;

                var matchedUsers = query.ToList();

                return Ok(matchedUsers);
            }

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
        public async Task<ActionResult<ApplicationUser>> PutApplicationUser(string id, string likedId, [FromBody] string base64Image)
        {
            ApplicationUser databaseUser = await _context.Users.Where(user => user.Id == id).FirstOrDefaultAsync();

            if (databaseUser == null || id == null)
            {
                return NotFound();
            }

            if (base64Image == "")
            {
                if (databaseUser.ProfilePicture != "")
                {
                    base64Image = databaseUser.ProfilePicture;
                }
                else
                {
                    return NotFound();
                }
            }

            if (base64Image != null)
            {
                databaseUser.ProfilePicture = base64Image;
            }

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
    }
}
