module.exports = class Game {
    constructor(id, io) {
        this.id = id;
        this.io = io;
        this.is_private = false;

        this.players = 0;

        this.player1;
        this.player2;
        this.ID;
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
}