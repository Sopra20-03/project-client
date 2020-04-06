/**
 * Game model
 */
class Game {
    constructor(data = {}) {
        this.gameId = null;
        this.gameName = null;
        this.creator = null;
        this.rounds = null;
        this.players = null;
        this.currentRound = null;
        this.score = null;
        this.status = null;
        this.mode=null;
        //this.token = null;
        Object.assign(this, data);
    }
}
export default Game;