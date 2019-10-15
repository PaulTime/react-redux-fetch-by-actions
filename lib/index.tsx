import React, {
  useRef, useEffect, useState, cloneElement,
  ReactElement,
} from 'react';
import { Config } from 'redux-promise-listener';
import useAsyncFunction from 'react-redux-promise-listener-hook';

import { Any, QueryConfig, TCreateFetch } from 'types';

type Props = Config & QueryConfig;
interface TState { loading: boolean; injected: Any; error?: Error }

const Query: React.FC<Props> = (props) => {
  const {
    // listener props
    start,
    resolve,
    reject,
    getPayload,
    getError,
    setPayload,
    promiseListener,
    // query props
    filter,
    loader,
    loaderElement,
    children,
  } = props;
  const asyncFn = useAsyncFunction(
    { start, resolve, reject, getPayload, getError, setPayload }, promiseListener,
  );

  const currentFetch = useRef<number | undefined>();
  const [state, setState] = useState<TState>({ loading: filter(props), injected: {} });

  const fetch = (fetchId: number): void => {
    asyncFn({ ...props, ...state })
      .then((fetched: Any = {}) => {
        if (currentFetch && fetchId !== currentFetch.current) return;

        setState({ loading: false, injected: fetched });
      })
      .catch((error: Error) => {
        if (currentFetch && fetchId !== currentFetch.current) return;

        console.error(error);

        setState({ injected: {}, error, loading: false });
      });
  };

  const refetch = (): void => {
    setState({ ...state, loading: filter(props) });
  };

  useEffect(() => {
    if (state.loading) {
      currentFetch.current = Math.random();
      fetch(currentFetch.current);
    }

    return (): void => currentFetch.current = undefined;
  }, [state.loading]);

  if (loader && state.loading) {
    return loaderElement;
  }

  return cloneElement(
    children,
    { ...props, ...state, fetch: refetch },
  );
};

Query.defaultProps = {
  filter: (): boolean => true,
  loader: true,
  loaderElement: null,
};

export const createFetch: TCreateFetch = (promiseListener, { defaultLoader }) => {
  return (options) =>
    (Component): ReactElement => (
      <Query promiseListener={promiseListener} loaderElement={defaultLoader} {...options}>
        <Component />
      </Query>
    );
};
