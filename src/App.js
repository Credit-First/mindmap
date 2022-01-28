import '@fake-db'
import React from "react";
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';
import Element from "./setup/routes";
import Auth from './auth/Auth';
import Authorization from "./auth/Authorization";
import store from 'store';
import defaultTheme from 'setup/theme';

const theme = createTheme(defaultTheme);

const generateClassName = createGenerateClassName({
  productionPrefix: 'c',
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        <Provider store={store}>
          <Auth>
            <Router history={createBrowserHistory()}>
              <Authorization>
                <Element />
              </Authorization>
            </Router>
          </Auth>
        </Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;