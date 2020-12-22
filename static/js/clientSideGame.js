// / reference path=".././lib/p5.global-mode.d.ts"/>

var win = false;
var turncounter = 0;
var gameboard = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

function printboard() {
    for(var i = 0; i < 7; i++){
        console.log(gameboard[i]);
    }
}

function clearboard() {
    gameboard = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ]
}

function setup() {
    let canvas = createCanvas(350, 300);
    canvas.parent("game");
    background(200);
    for(var i = 0; i < 7; i++){
        line(0, i*50, 350, i*50)   
    }
    for(var i = 0; i < 8; i++){
        line(i*50, 0, i*50, 300)   
    }
}

function move(x) {
    socket.emit("move", x);
}

socket.on("players", names => {
    document.getElementById("red-name").textContent = names[0];
    document.getElementById("yellow-name").textContent = names[1];
})

socket.on("game found", code => {
    if (!public) {
        document.getElementById("room-name").textContent = "Room Code: " + code;
    }
})

socket.on("badMove", () => {
    alert("That move is no good! Put your piece in a different column.")
})

socket.on("game closed", () => {
    window.location.reload();
})

socket.on("piece", data => {
    let currentPlayer = data.player;
    let x = data.position[0];
    let i = data.position[1];
    let turncounter = data.turncounter;
    if(currentPlayer === 1){
        fill(color(255, 0, 0));
        nextTurn = "Yellow";
    } else {
        fill(color(255, 204, 0));
        nextTurn = "Red";
    }
    // ctx.fillRect(x*50, 250-i*50, 50, 50);
    noStroke();
    circle(x*50+25, 275-i*50, 48);
    document.getElementById("playerNum").innerHTML = ("Next Turn: " + nextTurn);
    document.getElementById("turnCounter").innerHTML = ("Turn Counter: " + turncounter);
});

socket.on("win", color => {
    alert(color + " wins!");
})