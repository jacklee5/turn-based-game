module.exports = class Player {
    constructor(name, socket, game) {
        this.name = name;
        this.socket = socket;
        this.game;
    }
    leaveGame() {
        this.game.removePlayer(this);
    }
}