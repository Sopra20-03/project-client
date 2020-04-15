//Import Actions
import {GAME_CREATION, JOIN_GAME, LEAVE_GAME} from "../actions/types";

const initialState = {
  gameId: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GAME_CREATION:
      return {
        ...state,
        gameId: action.payload.gameId,
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

    default:
      return state;
  }
}
