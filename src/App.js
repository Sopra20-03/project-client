import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import Register from './components/login/Register'
//Redux
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";


/**
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <AppRouter />
        </div>
      </Provider>
    );
  }
}

export default App;
