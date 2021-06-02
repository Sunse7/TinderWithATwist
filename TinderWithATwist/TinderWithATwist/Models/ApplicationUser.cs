using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace TinderWithATwist
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            LikedUsers = new();
        }
        public string ProfilePicture { get; set; }
        [InverseProperty("LikedByUsers")]
        public List<ApplicationUser> LikedUsers { get; set; }
        [InverseProperty("LikedUsers")]
        public List<ApplicationUser> LikedByUsers { get; set; }
    }
}
