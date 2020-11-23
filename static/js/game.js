/// <reference path=".././lib/p5.global-mode.d.ts"/>

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

function move(x) {
    console.clear();
    var currentPlayer = (turncounter % 2) + 1
    //can probably remove
    if(x < 0 || x > 6) {
        console.log("Out of bounds!");
        var row = readline();
        move(turncounter%2, row);
    }

    //places piece at top of row and checks for a win
    for(var i = 0; i < 6; i++){ 
        if(gameboard[x][i] == 0){
            gameboard[x][i] = currentPlayer;
            var canvas = document.getElementById("myCanvas");
            var ctx = canvas.getContext("2d");
            if(currentPlayer === 1){
                ctx.fillStyle = '#FF0000';
            } else {
                ctx.fillStyle = '#FFFF00';
            }
            ctx.fillRect(x*50, 250-i*50, 50, 50);
            printboard();

            if(checkwin(currentPlayer, x, i) === "win"){
                alert("Player " + currentPlayer + " wins!");
                win = true;
                clearboard();
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, 350, 300)
            }
            break;
        }
    }
    document.getElementById("playerNum").innerHTML = ("Current Player: " + ((currentPlayer+1)%2));
    turncounter++;
}

function checkwin(player, x, y) {
    //horizontal check
    if(x-3 >= 0){
        if(gameboard[x][y] === player){
            if(gameboard[x-1][y] === player){
                if(gameboard[x-2][y] === player){
                    if(gameboard[x-3][y] === player){
                        console.log("Player " + player + " wins!1");
                        return("win");
                    }
                }
            }
        }       
    }

    if(x+3 < 7){
        if(gameboard[x][y] === player){
            if(gameboard[x+1][y] === player){
                if(gameboard[x+2][y] === player){
                    if(gameboard[x+3][y] === player){
                        console.log("Player " + player + " wins!2");
                        return("win");
                    }
                }
            }
        }    
    }

    //vertical check
    if(y-3 >= 0){
        if(gameboard[x][y] === player){
            if(gameboard[x][y-1] === player){
                if(gameboard[x][y-2] === player){
                    if(gameboard[x][y-3] === player){
                        console.log("Player " + player + " wins!3");
                        return("win");
                    }
                }
            }
        }       
    }

    if(y+3 < 6){
        if(gameboard[x][y] === player){
            if(gameboard[x][y+1] === player){
                if(gameboard[x][y+2] === player){
                    if(gameboard[x][y+3] === player){
                        console.log("Player " + player + " wins!4");
                        return("win");
                    }
                }
            }
        }    
    }

    //diagonal check
    if(x-3 >= 0 && y-3 >= 0){
        if(gameboard[x][y] === player){
            if(gameboard[x-1][y-1] === player){
                if(gameboard[x-2][y-2] === player){
                    if(gameboard[x-3][y-3] === player){
                        console.log("Player " + player + " wins!5");
                        return("win");
                    }
                }
            }
        }
    }

    if(x-3 >= 0 && y+3 < 7){
        if(gameboard[x][y] === player){
            if(gameboard[x-1][y+1] === player){
                if(gameboard[x-2][y+2] === player){
                    if(gameboard[x-3][y+3] === player){
                        console.log("Player " + player + " wins!6");
                        return("win");
                    }
                }
            }
        }
    }

    if(x+3 < 7 && y-3 >= 0){
        if(gameboard[x][y] === player){
            if(gameboard[x+1][y-1] === player){
                if(gameboard[x+2][y-2] === player){
                    if(gameboard[x+3][y-3] === player){
                        console.log("Player " + player + " wins!7");
                        return("win");
                    }
                }
            }
        }
    }
    
    if(x+3 < 7 && y+3 < 7){
        if(gameboard[x][y] === player){
            if(gameboard[x+1][y+1] === player){
                if(gameboard[x+2][y+2] === player){
                    if(gameboard[x+3][y+3] === player){
                        console.log("Player " + player + " wins!8");
                        return("win");
                    }
                }
            }
        }
    }
    
}

if (turncounter >= 42){
    console.log("What the balls!");
    printboard();
}