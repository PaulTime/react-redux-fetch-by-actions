import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'containers/routes/index';

import './reset.css';

function render(Component: React.ElementType): void {
    ReactDOM.render((
        <BrowserRouter basename={process.env.PUBLIC_PATH}>
            <Component />
        </BrowserRouter>
    ), document.getElementById('root'));
}

render(Routes);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./containers/routes', () => {
        const newRoutes = require('./containers/routes').default; // eslint-disable-line
        render(newRoutes);
    });
}