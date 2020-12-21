const { Console } = require('console');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// app.set('view engine', 'ejs');

app.use("/static", express.static("static"));
app.use("/shared", express.static("shared"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/temp-game', (req, res) => {
    res.sendFile(__dirname + "/views/tempGameDemo.html");
})

//load classes
const Game = require("./server/Game");
const Player = require("./server/Player");

const games = {};
const players = {};

//generate random id
const getId = () => {
    return Math.random().toString(36).substr(2, 5);
}

//creates a game
const createGame = () => {
    const id = getId();
    const game = new Game(id, io);
    games[id] = game;
    return game;
}

io.on('connection', function (socket) {
    console.log('[DEBUG] a user connected');

    var username;

    socket.on("player-send-name", (name) => {
        username = name;
        console.log(username);
    });

    socket.on("player-join-public", () => {
        joinGame(socket, username, false, -1);
    });
    
    socket.on("player-create-private", () => {
        joinGame(socket, username, true, -1);
    });
    
    socket.on("player-join-private", (roomcode) => {
        joinGame(socket, username, true, roomcode);
    });

    socket.on("move", x => {
        var moveResult = 0;
        const player = players[socket.id];
        console.log(player);
        if (player.game && player.game.started && player.playerNumber === ((player.game.turncounter % 2) + 1))
            moveResult = player.game.move(x);
            console.log("moveresult: ");
            console.log(moveResult);
            if(moveResult === -1){
                socket.emit("bad move");
            }
    })

    socket.on("disconnect", () => {
        const player = players[socket.id];
        if(!player) return;
        console.log(`[DEBUG] user ${player.name} disconnected`);
        const game = player.game;
        if(!game) return;
        // message to say the game is closed
        if (games[game.id]) {
            for (let i in games[game.id].players) {
                games[game.id].players[i].socket.emit("game closed");
            }
        }
        delete games[game.id];  
    })
});

const joinGame = (socket, username, private, roomcode) => {
    if(username.length > 15) return;
        // roomcode_str = roomcode.toString();
        const player = new Player(username, socket);
        let roomId;

        // if we are requesting a new private room, we dont need join an existing room
        if (!(private && roomcode == -1)) {
            for(let i in games){
                // console.log("[DEBUG] full: " + games[i].isFull());
                // console.log("[DEBUG] private: " + games[i].isPrivate());
                // console.log("[DEBUG] id: " + games[i].id);

                // the room must be full
                // then, if the game is public, only join if we're looking for a public game
                // then, if the game is private, only join if the user sent the right roomcode
                if( !games[i].isFull() && 
                        ((!games[i].isPrivate() && !private) ||
                        (games[i].isPrivate() && games[i].id == roomcode))) {
                    roomId = i;
                    break;
                }
            }
        }

        // console.log("[DEBUG] username: " + username);
        // console.log("[DEBUG] private: " + private);
        // console.log("[DEBUG] roomcode: " + roomcode);

        // no private rooms with the ID requested
        if (private && roomcode != -1 && !roomId) {
            console.log("[DEBUG] failed to find private room with code");
            return;
        }

        if(!roomId){
            const game = createGame(true);
            if (private && roomcode == -1) {
                game.is_private = true;
            }
            roomId = game.id;
        }


        socket.join(roomId);
        games[roomId].addPlayer(player);
        players[socket.id] = player;
        player.game = games[roomId];

        console.log(`[DEBUG] user ${username} in joined room ${roomId}`)
        
        socket.emit("game found", roomId);
}

//main loop
setInterval(() => {
    for(let i in games){
        if(games[i].finished) {
            delete games[i];
            continue;
        }
        // [TODO] game ticks
        // games[i].tick(io);
        // io.in(i).emit("state", games[i].toObject());
    }
}, 1000 / 60)

http.listen(7777, "0.0.0.0", function () {
    console.log('listening on *:80');
});