//Import Actions
import {
  GUESSER_SELECTWORD,
  CLUEWRITER_SUBMITCLUE,
  GAME_LOADGAME,
  GET_GAME_PLAYERS,
  PLAYER_SET_ROLE,
  GAME_GETROUND,
  GAME_UPDATEROUND,
} from "../actions/types";

const initialState = {
  gameId: null,
  userId: null,
  gamePlayers: [],
  roundNum: null,
  round: null,
  role: null,
  selectedWord: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //Handle different cases
    case GAME_LOADGAME:
      return {
        ...state,
        gameId: action.payload.gameId,
        userId: action.payload.userId,
      };

    case GET_GAME_PLAYERS:
      return {
        ...state,
        gamePlayers: action.payload,
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
      };

    case CLUEWRITER_SUBMITCLUE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
