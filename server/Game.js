module.exports = class Game {
    constructor(id, io) {
        this.id = id;
        this.io = io;
        this.is_private = false;

        this.players = 0;

        this.player1;
        this.player2;
        this.ID;

        this.gameboard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ];

        this.turncounter = 0;
        this.win = false;
    }
    isFull() {
        return this.players == 2;
    }
    isPrivate() {
        return this.is_private;
    }
    addPlayer(player) {
        if (this.player1) {
            this.player2 = player;
        } else {
            this.player1 = player;
        }
        this.players++;
    }
    clearboard() {
        this.gameboard = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]
    }
    move(x) {
        var nextTurn;
        var currentPlayer = (this.turncounter % 2) + 1


        //INSERT LOGIC TO PREVENT A ROW FROM GOING TOO HIGH


        //places piece at top of row and checks for a win
        for (var i = 0; i < 6; i++) {
            if (this.gameboard[x][i] == 0) {
                this.gameboard[x][i] = currentPlayer;
                if (currentPlayer === 1) {
                    nextTurn = "Yellow";
                } else {
                    nextTurn = "Red";
                }
                this.io.in(this.id).emit("piece", {
                    position: [x, i],
                    player: currentPlayer,
                    turncounter: this.turncounter
                })

                if (this.checkwin(currentPlayer, x, i) === "win") {
                    //Change alert to say a color instead of a number
                    if (currentPlayer === 1) {
                        this.io.in(this.id).emit("win", "Red");
                    } else {
                        this.io.in(this.id).emit("win", "Yellow");
                    }

                    this.win = true;
                    this.clearboard();
                    this.turncounter = -1;
                }
                break;
            }
        }
        this.turncounter++;
        if (this.turncounter >= 42) {
            console.log("What the balls!");
            alert("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo000000000000OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO")
        }
    }
    checkwin(player, x, y) {
        let gameboard = this.gameboard;
        //horizontal check
        if (x - 3 >= 0) {
            if (gameboard[x][y] === player) {
                if (gameboard[x - 1][y] === player) {
                    if (gameboard[x - 2][y] === player) {
                        if (gameboard[x - 3][y] === player) {
                            console.log("Player " + player + " wins!1");
                            return ("win");
                        }
                    }
                }
            }
        }

        if (x + 3 < 7) {
            if (gameboard[x][y] === player) {
                if (gameboard[x + 1][y] === player) {
                    if (gameboard[x + 2][y] === player) {
                        if (gameboard[x + 3][y] === player) {
                            console.log("Player " + player + " wins!2");
                            return ("win");
                        }
                    }
                }
            }
        }

        //vertical check
        if (y - 3 >= 0) {
            if (gameboard[x][y] === player) {
                if (gameboard[x][y - 1] === player) {
                    if (gameboard[x][y - 2] === player) {
                        if (gameboard[x][y - 3] === player) {
                            console.log("Player " + player + " wins!3");
                            return ("win");
                        }
                    }
                }
            }
        }

        if (y + 3 < 6) {
            if (gameboard[x][y] === player) {
                if (gameboard[x][y + 1] === player) {
                    if (gameboard[x][y + 2] === player) {
                        if (gameboard[x][y + 3] === player) {
                            console.log("Player " + player + " wins!4");
                            return ("win");
                        }
                    }
                }
            }
        }

        //diagonal check
        if (x - 3 >= 0 && y - 3 >= 0) {
            if (gameboard[x][y] === player) {
                if (gameboard[x - 1][y - 1] === player) {
                    if (gameboard[x - 2][y - 2] === player) {
                        if (gameboard[x - 3][y - 3] === player) {
                            console.log("Player " + player + " wins!5");
                            return ("win");
                        }
                    }
                }
            }
        }

        if (x - 3 >= 0 && y + 3 < 7) {
            if (gameboard[x][y] === player) {
                if (gameboard[x - 1][y + 1] === player) {
                    if (gameboard[x - 2][y + 2] === player) {
                        if (gameboard[x - 3][y + 3] === player) {
                            console.log("Player " + player + " wins!6");
                            return ("win");
                        }
                    }
                }
            }
        }

        if (x + 3 < 7 && y - 3 >= 0) {
            if (gameboard[x][y] === player) {
                if (gameboard[x + 1][y - 1] === player) {
                    if (gameboard[x + 2][y - 2] === player) {
                        if (gameboard[x + 3][y - 3] === player) {
                            console.log("Player " + player + " wins!7");
                            return ("win");
                        }
                    }
                }
            }
        }

        if (x + 3 < 7 && y + 3 < 7) {
            if (gameboard[x][y] === player) {
                if (gameboard[x + 1][y + 1] === player) {
                    if (gameboard[x + 2][y + 2] === player) {
                        if (gameboard[x + 3][y + 3] === player) {
                            console.log("Player " + player + " wins!8");
                            return ("win");
                        }
                    }
                }
            }
        }
    }
}