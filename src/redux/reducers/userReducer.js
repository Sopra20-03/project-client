//Import Actions
import {USER_REGISTER, USER_LOGIN} from '../actions/types';

const initialState = {
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_REGISTER:
            return {
                ...state,
                //Do not store Registered User in state
                //user: action.payload
            }
        
        case USER_LOGIN:
            console.log("reducer update state login()")
            return {
                ...state,
                user: action.payload
            }    

        default:
            return state;
    }
}