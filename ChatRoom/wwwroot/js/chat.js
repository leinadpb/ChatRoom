"use strict";
let connection = new signalR.HubConnectionBuilder().withUrl("/ChatRoom/ChatRoom").build();
let count = 0;

connection.on("ReceivedMessage", function (user, message){
    let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let element = CreateCustomElement(user, msg);

    $("#messagesList").prepend(element);
});

connection.on("SetClientID", function (clientid) {
    let id = clientid.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let idBox = document.getElementById("ClientID");
    idBox.setAttribute("value", id);
});

connection.start().catch(function err() {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    event.preventDefault();
    var user = document.getElementById("UserId").value;
    var message = document.getElementById("UserMessage").value;
    document.getElementById("UserMessage").value = "";
    if (message.length <= 0) {
        alert("Please, provide a message to sent!");
    } else {
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
    }
});

function CreateCustomElement(user, msg) {
    let aLink = document.createElement('a');
    let parentId = "aLink-" + count.toString();
    aLink.setAttribute("id", parentId);
    count++;
    aLink.setAttribute("class", "list-group-item list-group-item-action flex-column align-items-start");
    aLink.setAttribute("href", "#");

    let div = document.createElement('div');
    div.setAttribute("id", "divBox");
    div.setAttribute("class", "d-flex w-100 justify-content-between");

    let h5 = document.createElement('h5');
    h5.setAttribute("id", "title");
    h5.setAttribute("class", "mb-1");
    h5.innerText = user;

    let small = document.createElement('small');
    small.setAttribute("id", "dateToday");
    small.setAttribute("class", "text-muted");
    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let todayDate = month + "/" + day + "/" + year;
    let todayHour = hour + ":" + minute;
    small.innerText = todayDate + " - " + todayHour;

    let p = document.createElement('p');
    p.setAttribute("id", "otherInfo");
    p.setAttribute("class", "mb-1");
    p.innerText = msg;

    aLink.appendChild(div);
    aLink.appendChild(p);

    div.appendChild(h5);
    div.appendChild(small);

    DeleteAfter("#" + parentId, 10);
    return aLink;

}

function DeleteAfter(element, seconds) {
    setTimeout(function () {
        if ($(element).length > 0) {
            $(element).remove();
        }
    }, seconds * 1000)
}