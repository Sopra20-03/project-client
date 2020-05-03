//Import Actions
import {
  GAME_CREATION,
  JOIN_GAME,
  LEAVE_GAME,
  START_GAME,
  CANCEL_GAME,
  GET_GAMES,
  PLAY_GAME,
  USER_LOGOUT,
  GAME_CLEAR,
} from "../actions/types";

const initialState = {
  gameId: {},
  joinedGame: null,
  isUserCreator: false,
  gamesList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        //Clear the state
        gameId: {},
        joinedGame: null,
        isUserCreator: false,
        gamesList: [],
      };
    case GET_GAMES:
      return {
        ...state,
        gamesList: action.payload,
      };

    case GAME_CLEAR:
      return {
        gameId: {},
        joinedGame: null,
        isUserCreator: false,
        gamesList: [],
      };

    case GAME_CREATION:
      return {
        ...state,
        gameId: action.payload.gameId,
        joinedGame: action.payload,
        isUserCreator: true,
      };

    case JOIN_GAME:
      return {
        ...state,
        joinedGame: action.payload,
        gameId: action.payload.gameId,
      };

    case PLAY_GAME:
      return {
        ...state,
        joinedGame: action.payload,
      };

    case LEAVE_GAME:
      return {
        ...state,
        gameId: {},
        isUserCreator: false,
        joinedGame: null,
      };

    case START_GAME:
      return {
        ...state,
      };

    case CANCEL_GAME:
      return {
        ...state,
        gameId: {},
        isUserCreator: false,
        joinedGame: null,
      };

    default:
      return state;
  }
}
