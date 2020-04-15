//Import Actions
import {GAME_CREATION, JOIN_GAME, LEAVE_GAME, START_GAME} from "../actions/types";

const initialState = {
  gameId: {},
  isUserCreator: {},
  gameStatus: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
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
        gameStatus: "RUNNING",
      };

    default:
      return state;
  }
}
