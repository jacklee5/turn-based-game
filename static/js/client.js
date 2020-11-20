const socket = io();

// default stuff, add player to new room, make new room if needed
document.getElementById("form-join-public").addEventListener("submit", (e) => {
    console.log("qwer");
    e.preventDefault();
    const username = document.getElementById("username").value;
    socket.emit("player-send-name", username);
    socket.emit("player-join-public");
})

// creates a private game, only joinable by code
document.getElementById("form-create-private").addEventListener("submit", (e) => {
    console.log("asdf");
    e.preventDefault();
    const username = document.getElementById("username").value;
    socket.emit("player-send-name", username);
    socket.emit("player-create-private");
})

// add player to private room
document.getElementById("form-join-private").addEventListener("submit", (e) => {
    console.log("zxcv");
    e.preventDefault();
    const username = document.getElementById("username").value;
    const room_ID = document.getElementById("roomcode").value;
    socket.emit("player-send-name", username);
    socket.emit("player-join-private", room_ID);
})