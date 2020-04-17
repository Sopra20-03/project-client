/**
 * PlayerBox model
 */
class Player {
    constructor(data = {}) {
        this.playerId = null;
        this.role = null;
        this.userId = null;
        Object.assign(this, data);
    }
}
export default Player;