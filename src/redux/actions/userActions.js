import {USER_REGISTER} from './types';
import {api, handleError} from "../../helpers/api";
import User from "../../components/shared/models/User"

export const registerUser =  userData => async dispatch => {

    try {
        const response =  await api.post('/users', userData);
        const user = new User(response.data);
        dispatch({
            type: USER_REGISTER,
            payload: user
          })
      } catch (error) {
        alert(handleError(error));
      }
};