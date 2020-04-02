/**
 * JustOneGame model
 */
class JustOneGame {
    constructor(data = {}) {
        this.id = null;
        this.gameName = null;
        this.creator = null;
        this.rounds = null;
        this.players = null;
        this.currentRound = null;
        this.score = null;
        this.status = null;
        //this.token = null;
        Object.assign(this, data);
    }
}
export default JustOneGame;