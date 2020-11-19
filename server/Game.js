module.exports = class Game {
    constructor(type) {
        this.player1;
        this.player2;
        this.type = type || "public"
    }
    isFull() {
        return this.player1 && this.player2;
    }
}