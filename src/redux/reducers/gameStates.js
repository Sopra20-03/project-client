//TODO maybe call this Gamephases instead of GameStates -> no confusion with redux State

const GameStates = {
  SELECT_WORD: {
    value: "SELECT_WORD",
    next: "WRITE_CLUES",
  },
  WRITE_CLUES: {
    value: "WRITE_CLUES",
    next: "VALIDATE_CLUES",
  },
  VALIDATE_CLUES: {
    value: "VALIDATE_CLUES",
    next: "GUESSING",
  },
  GUESSING: {
    value: "GUESSING",
    next: "SELECT_WORD",
  },
};

export default GameStates;
