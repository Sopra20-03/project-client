//Import Actions
import {USER_REGISTER, USER_LOGIN, USER_LOGOUT, GET_USER_DETAILS} from "../actions/types";

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        //Do not store Registered User in state
        //user: action.payload
      };

    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
      };

    case USER_LOGOUT:
      return {
        //Clear the state
        user: {},
      };

    default:
      return state;
  }
}
