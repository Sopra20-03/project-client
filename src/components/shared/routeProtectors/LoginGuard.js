import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Guard for Login
 */
export const LoginGuard = props => {
  console.log(localStorage.getItem("token"))
  if (!localStorage.getItem("token")) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to={"/game"} />;
};
