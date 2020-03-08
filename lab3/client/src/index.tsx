import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'; //  See https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Reducer, Store, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { LogEntryObject, createLogger } from 'redux-logger';
import { ThemeProvider } from '@material-ui/styles';
import combinedReducer, { ReduxState } from 'redux/combinedReducer';
import { THEME } from 'styles/material-kit-react';
import 'styles/material-kit-react.scss';

import App from 'components/App/App';
import { Socket } from './Socket';

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry?: LogEntryObject) => {
    return (logEntry as LogEntryObject) && !(logEntry as LogEntryObject).error;
  },
  predicate: () => {
    return true;
  },
  duration: true,
  timestamp: false,
  diff: true,
});

const reducer: Reducer<ReduxState, any> = combinedReducer;
const store: Store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const render = (Component: any): void => {
  Socket.getInstance();

  return ReactDOM.render(
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <Component />
      </Provider>
    </ThemeProvider>,
    document.getElementById('root'),
  );
};

render(App);

export const STORE = store;
