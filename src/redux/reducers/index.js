import {combineReducers} from 'redux';
//Reducers
import userReducer from './userReducer';

export default combineReducers({
    users: userReducer
});