﻿using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatRoom.Hubs
{
    public class ChatRoomHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceivedMessage", user, message);
        }

        public override async Task OnConnectedAsync()
        {
            string clientId = Context.ConnectionId;
            await Clients.Client(clientId).SendAsync("SetClientID", clientId);
        }
    }
}
