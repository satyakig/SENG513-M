import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'; //  See https://github.com/facebook/create-react-app/tree/master/packages/react-app-polyfill
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App/App';

const render = (Component: any): void => {
  return ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

if (module.hot) {
  module.hot.accept('App/App', () => {
    const NextApp = require('App/App').default;
    render(NextApp);
  });
}
