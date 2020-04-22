import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import {RouteGuard} from "../routeProtectors/RouteGuard";
import Login from "../../login/Login";
import Lobby from "../../lobby/Lobby";
import GameDetails from "../../lobby/GameDetails";
import Register from "../../login/Register";
import Gameplay from "../../game/Gameplay"
import GameHistory from "../../gameHistory/GameHistory";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route
              path="/gameplay"
              exact
              render={() => (
                  <RouteGuard>
                      <Gameplay />
                  </RouteGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
                path="/register"
                exact
                render={() => (
                    <LoginGuard>
                        <Register/>
                    </LoginGuard>
                )}
            />
              <Route
                  path="/lobby"
                  exact
                  render={() => (
                      <RouteGuard>
                          <Lobby />
                      </RouteGuard>
                  )}
              />
              <Route
                  path="/gameDetails"
                  exact
                  render={() => (
                      <RouteGuard>
                          <GameDetails />
                      </RouteGuard>
                  )}
              />
            <Route
                path="/gamehistory"
                exact
                render={() => (
                    <RouteGuard>
                        <GameHistory />
                    </RouteGuard>
                )}
            />


            <Route path="/" exact render={() => (
                <RouteGuard>
                    <Redirect to={"/gameplay"} />
                </RouteGuard>
            )} />
        
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
