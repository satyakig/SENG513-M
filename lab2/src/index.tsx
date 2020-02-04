import 'core-js/stable'; // Polyfill only stable `core-js` features - ES and web standards. See https://github.com/zloirock/core-js
import 'react-app-polyfill/ie11'; //  See https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Reducer, Store, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { LogEntryObject, createLogger } from 'redux-logger';
import App from 'components/App/App';
import combinedReducer, { ReduxState } from 'redux/CombinedReducer';

/* eslint-disable @typescript-eslint/no-explicit-any */
const reducer: Reducer<ReduxState, any> = combinedReducer;

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

const store: Store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

if (module.hot) {
  module.hot.accept('redux/CombinedReducer', () => {
    store.replaceReducer(reducer);
  });
}

const render = (Component: any): void => {
  return ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename="">
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('components/App/App', () => {
    const NextApp = require('components/App/App').default;
    render(NextApp);
  });
}
