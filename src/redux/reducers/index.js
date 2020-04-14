import {combineReducers} from 'redux';
//Reducers
import userReducer from './userReducer';
import gameReducer from "./gameReducer";

export default combineReducers({
    userReducer: userReducer,
    gameReducer: gameReducer
});