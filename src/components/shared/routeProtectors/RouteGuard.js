import React from "react";
import { Redirect } from "react-router-dom";

/**
 *
 * Another way to export directly your functional component.
 */
export const RouteGuard = props => {

    if (!localStorage.getItem("token")) {
        //User is not logged-in, redirect
        return <Redirect to={"/login"} />;
    }
    // if user is already logged in, return to requested route
    return props.children;
};