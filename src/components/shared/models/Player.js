/**
 * PlayerBox model
 */
class Player {
    constructor(data = {}) {
        this.playerId = null;
        this.role = null;
        this.userId = null;
        this.username = null;
        this.icon = null;
        Object.assign(this, data);
    }
}
export default Player;