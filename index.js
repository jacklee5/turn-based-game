const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Game = require("./server/Game");
const Player = require("./server/Player");

const PORT = 3000;
const games = [];

app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})

io.on("connection", socket => {
    socket.on("JOIN", data => {
        let game;
        for (let i in games) {
            if (games[i].isFull()) continue;
            if (games[i].type === "private") continue;
            game = games[i];
        }
        if (!game)
            game = new Game();
        
    })
});

server.listen(PORT, () => {
    console.log("Listening on http://localhost:" + PORT);
})