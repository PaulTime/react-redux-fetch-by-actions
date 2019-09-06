import React, { DependencyList } from 'react';

import { AnyObject } from 'types';

type TProps = {
  action: (data?: AnyObject) => Promise<AnyObject| undefined | void>;
  when?: boolean;
  loader?: boolean;
  watch?: DependencyList;
  children?: React.ReactElement | Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: { (data?: AnyObject): Promise<any> | any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError?: { (data?: AnyObject): Promise<any> | any };
};

/**
 * Query component
 * basic usage:
 *  <Query action={() => window.fetch('/test').then(res => res.html()}>
 *    {({ data }) => data}
 *  </Query>
 *
 * fetching on props update: props.watch: DependencyList - list of values that listening for changes
 */
const Query: React.FC<TProps> = ({ action, when, loader, watch, onSuccess, onError, children }: TProps) => {
  const currentFetch = React.useRef<number | undefined>();
  const [state, setState] =
    React.useState<{ loading: boolean; injected: AnyObject }>({ loading: when, injected: {} });

  const fetch = (fetchId: number): void => {
    action(state.injected)
      .then(async (fetched: AnyObject = {}) => {
        if (currentFetch && fetchId !== currentFetch.current) return;

        await onSuccess(fetched);
        setState({ loading: false, injected: fetched });
      })
      .catch(async (error) => {
        if (currentFetch && fetchId !== currentFetch.current) return;

        console.error(error);

        await onError(error);
        setState({ ...state, loading: false });
      });
  };

  React.useEffect(() => {
    setState({ ...state, loading: when });

    if (when) {
      currentFetch.current = Math.random();
      fetch(currentFetch.current);
    }

    return (): void => currentFetch.current = undefined;
  }, watch);

  if (loader && state.loading) {
    return '...loading';
  }

  if (typeof children === 'function') {
    return children({ loading: state.loading, ...state.injected });
  }

  return React.cloneElement(
    React.Children.only(children),
    { loading: state.loading, ...state.injected },
  );
};

Query.defaultProps = {
  action: (): Promise<void> => Promise.resolve(),
  when: false,
  loader: true,
  watch: [],
  onSuccess: (): void => {},
  onError: (): void => {},
};

export default Query;