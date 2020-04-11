import React from "react";
import { Redirect } from "react-router-dom";
//Redux
import store from '../../../store';

export const LoginGuard = props => {

  const state = store.getState();
  console.log("LoginGuard")
  console.log(state)

  if (state.userReducer.user.token==null) {
    //User is not logged-in, Load Login
    return props.children;
  }
  // If user is already logged in, return to Lobby page
  return <Redirect to={"/lobby"} />;
};
