//Import Actions
import { GUESSER_SELECTWORD } from "../actions/types";

const initialState = {
  gameId: null,
  userId: null,
  round: null,
  role: null,
  selectedWord: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    //Handle different cases
    case GUESSER_SELECTWORD:
      return {
        ...state,
        round: action.payload,
      };
    default:
      return state;
  }
}
