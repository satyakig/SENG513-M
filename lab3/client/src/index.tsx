import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'; //  See https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Reducer, Store, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { LogEntryObject, createLogger } from 'redux-logger';
import combinedReducer, { ReduxState } from 'redux/combinedReducer';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from 'App/App';

const isDev = process.env.NODE_ENV === 'development';

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry?: LogEntryObject) => {
    return (logEntry as LogEntryObject) && !(logEntry as LogEntryObject).error;
  },
  predicate: () => {
    return isDev;
  },
  duration: true,
  timestamp: false,
  diff: true,
});

const reducer: Reducer<ReduxState, any> = combinedReducer;
const store: Store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const render = (Component: any): void => {
  return ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot && isDev) {
  module.hot.accept('redux/combinedReducer', () => {
    store.replaceReducer(reducer);
  });
}

if (module.hot && isDev) {
  module.hot.accept('App/App', () => {
    const NextApp = require('App/App').default;
    render(NextApp);
  });
}
