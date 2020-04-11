import React, { Component } from "react";
import AppRouter from "./components/shared/routers/AppRouter";
import Register from "./components/login/Register";
//Redux
import { store } from "./store";
import { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

/**
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <div>
            <AppRouter />
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
