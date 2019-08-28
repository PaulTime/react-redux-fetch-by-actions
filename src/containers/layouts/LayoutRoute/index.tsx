import React from 'react';
import H from 'history';
import { RouteProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import qs from 'query-string';

interface Props {
  children: React.ReactElement<RouteProps> | Array<React.ReactElement<RouteProps>>;
  component?: React.ElementType;
  location?: H.Location;
  path?: string;
}

/**
 *  LayoutRoute
 *  Usage:
 *
 *  import { Route } from 'react-router-dom'
 *
 *  import LayoutRoute 'components/LayoutRoute'
 *  import YourLayoutComponent 'components/YourLayoutComponent'
 *  import BlockComponent 'components/BlockComponent'
 *
 *  <LayoutRoute
 *    path="/page-name"
 *    component={YourLayoutComponent}
 *  >
 *    <Route
 *      path="/sub-page#1-name"
 *      component={BlockComponent}
 *    />
 *  </LayoutRoute>
 * */
const LayoutRoute: React.FC<Props> = ({ children, component: Component, path, location, ...rest }: Props) => (
  <Route
    path={path}
    render={(): React.ReactElement => (
      <Component>
        <Switch location={{ ...location, query: qs.parse(location.search) } as H.Location}>
          {React.Children.map(children, child =>
            React.cloneElement(child, {
              path: `${path || ''}${child.props.path || ''}`,
            }))}
        </Switch>
      </Component>
    )}
    {...rest}
  />
);


export default LayoutRoute;