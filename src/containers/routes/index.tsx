import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LayoutRoute from 'containers/layouts/LayoutRoute';
import CabinetLayout from 'containers/layouts/Cabinet';

const Routes: React.FC = () => (
  <Switch>
    <LayoutRoute component={CabinetLayout}>
      <Route render={(): React.ReactNode => 'test'}/>
    </LayoutRoute>
  </Switch>
);

export default Routes;