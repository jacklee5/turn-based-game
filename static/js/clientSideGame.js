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

// function move(x) {
//     io.emit("move", x);
//     console.clear();
//     var nextTurn;
//     var currentPlayer = (turncounter % 2) + 1


//     //INSERT LOGIC TO PREVENT A ROW FROM GOING TOO HIGH


//     //places piece at top of row and checks for a win
//     for(var i = 0; i < 6; i++){ 
//         if(gameboard[x][i] == 0){
//             gameboard[x][i] = currentPlayer;
//             // var canvas = document.getElementById("myCanvas");
//             // var ctx = canvas.getContext("2d");
//             if(currentPlayer === 1){
//                 fill(color(255, 0, 0));
//                 nextTurn = "Yellow";
//             } else {
//                 fill(color(255, 204, 0));
//                 nextTurn = "Red";
//             }
//             // ctx.fillRect(x*50, 250-i*50, 50, 50);
//             noStroke();
//             circle(x*50+25, 275-i*50, 48);

//             printboard();

//             if(checkwin(currentPlayer, x, i) === "win"){
//                 //Change alert to say a color instead of a number
//                 if(currentPlayer === 1) {
//                     alert("Red wins!");
//                 } else {
//                     alert("Yellow wins!");
//                 }
                
//                 win = true;
//                 clearboard();
//                 setup();
//                 turncounter = -1;
//                 // ctx.fillStyle = '#FFFFFF';
//                 // ctx.fillRect(0, 0, 350, 300)
//             }
//             break;
//         }
//     }
//     turncounter++;
//     document.getElementById("playerNum").innerHTML = ("Next Turn: " + nextTurn);
//     document.getElementById("turnCounter").innerHTML = ("Turn Counter: " + turncounter);
//     if (turncounter >= 42){
//         console.log("What the balls!");
//         alert("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
//     }
// }

// function checkwin(player, x, y) {

//     //horizontal check
//     if(x-3 >= 0){
//         if(gameboard[x][y] === player){
//             if(gameboard[x-1][y] === player){
//                 if(gameboard[x-2][y] === player){
//                     if(gameboard[x-3][y] === player){
//                         console.log("Player " + player + " wins!1");
//                         return("win");
//                     }
//                 }
//             }
//         }       
//     }

//     if(x+3 < 7){
//         if(gameboard[x][y] === player){
//             if(gameboard[x+1][y] === player){
//                 if(gameboard[x+2][y] === player){
//                     if(gameboard[x+3][y] === player){
//                         console.log("Player " + player + " wins!2");
//                         return("win");
//                     }
//                 }
//             }
//         }    
//     }

//     //vertical check
//     if(y-3 >= 0){
//         if(gameboard[x][y] === player){
//             if(gameboard[x][y-1] === player){
//                 if(gameboard[x][y-2] === player){
//                     if(gameboard[x][y-3] === player){
//                         console.log("Player " + player + " wins!3");
//                         return("win");
//                     }
//                 }
//             }
//         }       
//     }

//     if(y+3 < 6){
//         if(gameboard[x][y] === player){
//             if(gameboard[x][y+1] === player){
//                 if(gameboard[x][y+2] === player){
//                     if(gameboard[x][y+3] === player){
//                         console.log("Player " + player + " wins!4");
//                         return("win");
//                     }
//                 }
//             }
//         }    
//     }

//     //diagonal check
//     if(x-3 >= 0 && y-3 >= 0){
//         if(gameboard[x][y] === player){
//             if(gameboard[x-1][y-1] === player){
//                 if(gameboard[x-2][y-2] === player){
//                     if(gameboard[x-3][y-3] === player){
//                         console.log("Player " + player + " wins!5");
//                         return("win");
//                     }
//                 }
//             }
//         }
//     }

//     if(x-3 >= 0 && y+3 < 7){
//         if(gameboard[x][y] === player){
//             if(gameboard[x-1][y+1] === player){
//                 if(gameboard[x-2][y+2] === player){
//                     if(gameboard[x-3][y+3] === player){
//                         console.log("Player " + player + " wins!6");
//                         return("win");
//                     }
//                 }
//             }
//         }
//     }

//     if(x+3 < 7 && y-3 >= 0){
//         if(gameboard[x][y] === player){
//             if(gameboard[x+1][y-1] === player){
//                 if(gameboard[x+2][y-2] === player){
//                     if(gameboard[x+3][y-3] === player){
//                         console.log("Player " + player + " wins!7");
//                         return("win");
//                     }
//                 }
//             }
//         }
//     }
    
//     if(x+3 < 7 && y+3 < 7){
//         if(gameboard[x][y] === player){
//             if(gameboard[x+1][y+1] === player){
//                 if(gameboard[x+2][y+2] === player){
//                     if(gameboard[x+3][y+3] === player){
//                         console.log("Player " + player + " wins!8");
//                         return("win");
//                     }
//                 }
//             }
//         }
//     }
    
// }

function move(x) {
    socket.emit("move", x);
}
socket.on("badMove", () => {
    alert("That move is no good! Put your piece in a different column.")
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