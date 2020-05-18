import React, { Component } from 'react';
import AppRouter from './components/shared/routers/AppRouter';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Redux
import { persistor, store } from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

toast.configure ();

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
