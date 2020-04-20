//Import Actions
import {
  GAME_CREATION,
  JOIN_GAME,
  LEAVE_GAME,
  START_GAME,
  CANCEL_GAME,
  GET_GAMES,
} from "../actions/types";

const initialState = {
  gameId: {},
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
        isUserCreator: true,
      };

    case JOIN_GAME:
      return {
        ...state,
        gameId: action.payload.gameId,
      };

    case LEAVE_GAME:
      return {
        ...state,
        gameId: {},
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
      };

    default:
      return state;
  }
}
