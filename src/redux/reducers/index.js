import { combineReducers } from "redux";
//Reducers
import userReducer from "./userReducer";
import gameplayReducer from "./gameplayReducer";
import lobbyReducer from "./lobbyReducer";

export default combineReducers({
  userReducer: userReducer,
  gameplayReducer: gameplayReducer,
  lobbyReducer: lobbyReducer,
});
