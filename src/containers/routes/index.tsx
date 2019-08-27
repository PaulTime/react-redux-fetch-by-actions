import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

const Routes: React.ElementType = () => (
  <Switch>
    <Route render={(): React.ReactNode => 'test'}/>
  </Switch>
);

export default Routes;