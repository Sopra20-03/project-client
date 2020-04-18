//Import Actions
import { GUESSER_SELECTWORD } from "../actions/types";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    //Handle different cases
    case GUESSER_SELECTWORD:
      return {
        ...state,
      };
    default:
      return state;
  }
}
