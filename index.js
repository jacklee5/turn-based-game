const express = require("express");
const path = require("path");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = 3000;

app.use(express.static("static"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
})

io.on("connection", socket => {
    console.log("a user connected");
})

server.listen(PORT, () => {
    console.log("Listening on http://localhost:" + PORT);
})