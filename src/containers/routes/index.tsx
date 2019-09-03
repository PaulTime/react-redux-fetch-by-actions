import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LayoutRoute from 'containers/layouts/LayoutRoute';
import CabinetLayout from 'containers/layouts/Cabinet';
import HintPage from 'containers/pages/Hint';

const Routes: React.FC = () => (
  <Switch>
    <LayoutRoute component={CabinetLayout}>
      <Route component={HintPage}/>
    </LayoutRoute>
  </Switch>
);

export default Routes;