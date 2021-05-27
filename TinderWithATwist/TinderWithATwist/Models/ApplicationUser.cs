using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TinderWithATwist
{
    public class ApplicationUser : IdentityUser
    {
        public string ProfilePicture { get; set; }
    }
}
