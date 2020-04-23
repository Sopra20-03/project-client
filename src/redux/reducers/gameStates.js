 const GameStates = {
    'SELECT_WORD': {
        value: 'SELECT_WORD',
        next: 'WRITE_CLUES'
    },
    'WRITE_CLUES': {
        value: 'WRITE_CLUES',
        next: 'VALIDATE_CLUES'
    },
    'VALIDATE_CLUES': {
        value: 'VALIDATE_CLUES',
        next: 'GUESSING'
    },
    'GUESSING': {
        value: 'GUESSING',
        next: 'RESET_ROLES'
    },
    'RESET_ROLES': {
        value: 'RESET_ROLES',
        next: 'SELECT_WORD'
    }
};

export default GameStates;
