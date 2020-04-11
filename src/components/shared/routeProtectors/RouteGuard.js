import React from "react";
import { Redirect } from "react-router-dom";
//Redux
import store from '../../../store';

export const RouteGuard = props => {

    const state = store.getState();
    console.log("RouteGuard")
    console.log(state);

    if (state.userReducer.user.token==null) {
        //User is not logged-in, redirect
        return <Redirect to={"/login"} />;
    }
    // If user is already logged in, return to requested route
    return props.children;
};