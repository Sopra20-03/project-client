//Import Actions
import {
  GAME_CREATION,
  JOIN_GAME,
  LEAVE_GAME,
  START_GAME,
  CANCEL_GAME,
  GET_GAMES,
  PLAY_GAME,
} from "../actions/types";

const initialState = {
  gameId: {},
  joinedGame: null,
  isUserCreator: false,
  gamesList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        gamesList: action.payload,
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
