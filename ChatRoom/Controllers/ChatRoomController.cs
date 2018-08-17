using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Authorization;
using ChatRoom.Models;
using ChatRoom.ViewModels;
using Microsoft.AspNetCore.Identity;
using ChatRoom.Areas.Identity.Data;

namespace ChatRoom.Controllers
{
    [Authorize]
    public class ChatRoomController : Controller
    {
        private UserManager<ApplicationUser> UserManager;

        public ChatRoomController(UserManager<ApplicationUser> usm)
        {
            this.UserManager = usm;
        }

        [HttpGet]
        public IActionResult ChatRoom()
        {
            ApplicationUser user = UserManager.GetUserAsync(HttpContext.User).Result;
            if(user != null)
            {
                return View(new ChatRoomViewModel
                {
                    FirstName = user.Name,
                    LastName = user.Lastname
                });
            }
            else{
                return View(new ChatRoomViewModel {
                    FirstName = "",
                    LastName = ""
                });
            }
        }
    }
}