/**
 * Clue model
 */
class Clue {
    constructor(data = {}) {
        this.clueId = null;
        this.word = null;
        this.isValid = null;
        this.votes = [];
        this.ownerId = null;
        Object.assign(this, data);
    }
}
export default Clue;