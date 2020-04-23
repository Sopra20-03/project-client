//Import Actions
import {
  ADVANCE_GAME_STATE,
  CLUEWRITER_SUBMITCLUE,
  GAME_GETCLUES,
  GAME_GETROUND,
  GAME_LOADGAME,
  GAME_UPDATEROUND,
  GET_GAME_PLAYERS,
  GUESSER_SELECTWORD,
  PLAYER_SET_ROLE,
  USER_LOGOUT
} from '../actions/types';
import GameStates from './gameStates';

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
  currentGameState: GameStates.SELECT_WORD
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
        gamePlayers: [],
        roundNum: null,
        round: null,
        role: null,
        selectedWord: null,
        currentGameState: null
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

    case GAME_GETCLUES:
      return {
        ...state,
        clues: action.payload,
      };

    case ADVANCE_GAME_STATE:
      return {
        ...state,
        currentGameState: action.payload
      };

    default:
      return state;
  }
}
