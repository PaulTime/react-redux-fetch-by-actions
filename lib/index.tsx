import React, { FunctionComponent, ElementType, useRef, useEffect, useState } from 'react';
import useAsyncFunction from 'react-redux-promise-listener-hook';

import { Any, TCreateFetch, CreateFetchFactory } from 'types';

import { createUseFetch } from './useFetch';

interface TState { loading: boolean; injected: Any; error?: Error }

export const createFetch: TCreateFetch = (promiseListener, { defaultLoader }) => {
  return (options): CreateFetchFactory => {
    return { fetchDecorator: (Component): ElementType => {
      const Query: FunctionComponent = (props) => {
        const {
          // listener options
          start,
          resolve,
          reject,
          getPayload,
          getError,
          setPayload,
          // query options
          filter,
          loader,
          loaderElement,
        } = options;

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
          return loaderElement || defaultLoader;
        }

        return <Component {...props} {...state} fetch={refetch} />;
      };

      Query.defaultProps = {
        filter: (): boolean => true,
        loader: true,
        loaderElement: null,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore no display name or name on elementType typing
      Query.displayName = `withQuery(${Component.displayName || Component.name})`;

      return Query;
    }, useFetch: createUseFetch(promiseListener) }
  };
};
