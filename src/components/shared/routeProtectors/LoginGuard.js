import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
  console.log(localStorage.getItem("token"))

  if (!localStorage.getItem("token")) {
    //User is not logged-in, Load Login
    return props.children;
  }
  // If user is already logged in, return to Lobby page
  return <Redirect to={"/lobby"} />;
};
