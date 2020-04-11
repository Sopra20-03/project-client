//Import Actions
import {USER_REGISTER} from '../actions/types';

const initialState = {
    user: {}
}

export default function(state = initialState, action) {
    switch(action.type){
        case USER_REGISTER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}