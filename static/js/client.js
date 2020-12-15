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
});

const Pages = {
    MENU: 0,
    GAME: 1
}
const showPage = id => {
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    pages[id].style.display = "block";
}

socket.on("game found",  () => {
    showPage(Pages.GAME);
});

socket.on("bad move",  () => {
    alert("That move is illegal! Please put your piece in a column with empty spaces.");
});

socket.on("game closed",  () => {
    showPage(Pages.MENU);
});