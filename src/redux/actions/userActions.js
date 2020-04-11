import {USER_REGISTER, USER_LOGIN} from './types';
import {api, handleError} from "../../helpers/api";
import User from "../../components/shared/models/User"

export const registerUser =  userData => async dispatch => {
    try {
        const response =  await api.post('/users', userData);
        const user = new User(response.data);
        console.log(user)
        dispatch({
            type: USER_REGISTER,
            payload: user
          })
      } catch (error) {
        alert(handleError(error));
      }
};

export const loginUser =  userData => async dispatch => {
  try {
      const response =  await api.post('/login', userData, {
        withCredentials: true
      });
      const user = new User(response.data);
      console.log(user);
      dispatch({
          type: USER_LOGIN,
          payload: user
        })
    } catch (error) {
      alert(handleError(error));
    }
};