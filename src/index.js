import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import App from './../src/routes/Index';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { PersistGate } from 'redux-persist/integration/react'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const { store, persistor } = configureStore();

const theme = createMuiTheme({ // eslint-disable-line
    typography: { // eslint-disable-line
        fontFamily: "'Chakra Petch', sans-serif;"
    }
});

ReactDOM.render(

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

            <MuiThemeProvider theme={theme}>

                <App />

            </MuiThemeProvider>

        </PersistGate>
    </Provider>



    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
