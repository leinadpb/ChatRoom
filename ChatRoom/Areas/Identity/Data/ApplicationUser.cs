using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoom.Areas.Identity.Data
{
    public class ApplicationUser : IdentityUser
    {
        [PersonalData]
        [Required]
        public string Name { get; set; }
        [PersonalData]
        [Required]
        public string Lastname { get; set; }
        [PersonalData]
        [Required]
        [DataType(DataType.Date)]
        public DateTime Birthdate { get; set; }
        [PersonalData]
        [Required]
        public string Sex { get; set; }
        [PersonalData]
        [Required]
        [DataType(DataType.Date)]
        public DateTime RegisteredDate { get; set; }

    }
}
