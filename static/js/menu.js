const socket = io();
const Pages = {
    MENU: 1
}
const showPage = id => {
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    pages[id].style.display = "block";
}

// document.getElementById("public-game-button").addEventListener("click", () => {
//     let username = document.getElementById("username").value;
//     if (username.length === 0)
//         return alert("no empty names");
//     io.emit("JOIN", {
//         username: username
//     });
// });