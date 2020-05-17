import { GET_USER_DETAILS, USER_LOGIN, USER_LOGOUT, USER_REGISTER } from './types';
import { api } from '../../helpers/api';
import User from '../../components/shared/models/User';

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post("/users", userData);
    const user = new User(response.data);
    dispatch({
      type: USER_REGISTER,
      payload: user,
    });
  } catch (error) {
    throw error;
  }
};

export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await api.post("/login", userData, {
      withCredentials: true,
    });
    const user = new User(response.data);
    dispatch({
      type: USER_LOGIN,
      payload: user,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/users/${userId}`, {
      withCredentials: true,
    });
    const user = new User(response.data);
    dispatch({
      type: GET_USER_DETAILS,
      payload: user,
    });
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await api.post("/logout", {
      withCredentials: true,
    });
    dispatch({
      type: USER_LOGOUT,
    });
  } catch (error) {
    throw error;
  }
};
