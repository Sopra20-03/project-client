import { GET_USER_DETAILS, USER_LOGIN, USER_LOGOUT, USER_REGISTER } from './types';
import { api } from '../../helpers/api';
import User from '../../components/shared/models/User';
import { infoNotification } from '../../helpers/notifications/toasts';

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

export const logoutUser = (remove, data) => async (dispatch) => {
  console.log("userActions Logout User");
  console.log(remove);
  console.log(data);
  //Rmove player from game if true
  if (remove == true) {
    //
    //Check if Creator
    if (data.isUserCreator == true) {
      //Delete the game
      try {
        const response = await api.delete(`/games/${data.gameId}`, {
          withCredentials: true,
        });
      } catch (error) {
        throw error;
      }
    } else {
      //Not a creator
      //Remove from game
      try {
        const response = await api.delete(
          `/games/${data.gameId}/players/${data.userId}`,
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        throw error;
      }
    }
  }

  //Logout
  console.log("Logout User");
  try {
    infoNotification ('Goodbye, see you next time! 😊👋', 2000);
    await api.post("/logout", {
      withCredentials: true,
    })
    dispatch({
      type: USER_LOGOUT,
    });
    console.log("Logout User Success");

  } catch (error) {
    throw error;
  }
};
