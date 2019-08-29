import React from 'react';
import H from 'history';
import { RouteProps, RouteChildrenProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import qs, { ParsedQuery } from 'query-string';

type Props = RouteProps & {
  children: React.ReactNode | React.ReactNodeArray;
  component: React.ElementType;
}

type LocationExtended = H.Location & {
  query: ParsedQuery;
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
    render={(props: RouteChildrenProps): React.ReactElement<Route> => (
      <Component {...props}>
        <Switch location={{ ...location, query: qs.parse(location.search) } as LocationExtended}>
          {React.Children.map(children, (child: React.ReactElement<RouteProps>) =>
            React.cloneElement(child, {
              path: `${path || ''}${child.props.path || ''}`,
            }))}
        </Switch>
      </Component>
    )}
    {...rest}
  />
);

export default React.memo(LayoutRoute);