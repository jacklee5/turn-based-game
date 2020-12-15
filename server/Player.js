module.exports = class Player {
    constructor(name, socket, game) {
        this.name = name;
        this.socket = socket;
        this.game;
        this.playerNumber;
    }
    leaveGame() {
        this.game.removePlayer(this);
    }
}