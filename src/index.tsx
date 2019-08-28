import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'containers/routes';

import './reset.css';

function render(Component: React.ElementType): void {
  ReactDOM.render((
    <BrowserRouter basename={process.env.PUBLIC_PATH}>
      <Component />
    </BrowserRouter>
  ), document.getElementById('root') as HTMLDivElement);
}

render(Routes);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/routes', () => {
        const newRoutes = require('./containers/routes').default; // eslint-disable-line
    render(newRoutes);
  });
}