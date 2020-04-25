//Import Actions
import {
  GUESSER_SELECTWORD,
  CLUEWRITER_SUBMITCLUE,
  GUESSER_SUBMITGUESS,
  GAME_GETCLUES,
  GAME_LOADGAME,
  GET_GAME_PLAYERS,
  PLAYER_SET_ROLE,
  GAME_GETROUND,
  GAME_UPDATEROUND,
  USER_LOGOUT,
} from "../actions/types";

const initialState = {
  gameId: null,
  userId: null,
  playerId: null,
  gamePlayers: [],
  roundNum: null,
  round: null,
  role: null,
  selectedWord: null,
  clues: [],
  gamePhase: null,
  score: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //Handle the different cases
    case GAME_LOADGAME:
      return {
        ...state,
        gameId: action.payload.gameId,
        userId: action.payload.userId,
      };

    case GET_GAME_PLAYERS:
      return {
        ...state,
        gamePlayers: action.payload.players,
        playerId: action.payload.playerId,
      };

    case USER_LOGOUT:
      return {
        //Clear the state
        gameId: null,
        userId: null,
        playerId: null,
        gamePlayers: [],
        roundNum: null,
        round: null,
        role: null,
        selectedWord: null,
        clues: [],
        gamePhase: null,
        score: null,
      };

    case GAME_GETROUND:
      return {
        ...state,
        round: action.payload,
      };

    case GAME_UPDATEROUND:
      return {
        ...state,
        roundNum: action.payload,
      };

    case PLAYER_SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };

    case GUESSER_SELECTWORD:
      return {
        ...state,
        round: action.payload,
        gamePhase: "WRITING_CLUES"
      };

    case CLUEWRITER_SUBMITCLUE:
      return {
        ...state,
        gamePhase: "GUESSING",
      };

    case GUESSER_SUBMITGUESS:
      return {
        ...state,
        gamePhase: "CHECK_GUESS"
      };

    case GAME_GETCLUES:
      return {
        ...state,
        clues: action.payload,
      };

    default:
      return state;
  }
}
