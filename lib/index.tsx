import React, { FunctionComponent, ElementType } from 'react';

import { TCreateFetch } from 'types';

import { createUseFetch } from './useFetch';

const defaultOptions = {
  initialFilter: (): boolean => true,
  loader: true,
  loaderElement: null as React.ReactElement,
};

const createFetch: TCreateFetch = (promiseListener, { defaultLoader } = {}) => {
  const useFetch = createUseFetch(promiseListener);

  return {
    fetchDecorator: (options) => (Component): ElementType => {
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
          initialFilter,
          loader,
          loaderElement,
        } = { loaderElement: defaultLoader, ...defaultOptions, ...options };

        const state = useFetch({
          start, resolve, reject, getPayload, getError, setPayload,
          initialLoading: initialFilter(props),
          payload: props,
        });

        if (loader && state.loading) {
          return loaderElement;
        }

        return <Component {...props} {...state} />;
      };

      Query.defaultProps = defaultOptions;

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore no display name or name on elementType typing
      Query.displayName = `withQuery(${Component.displayName || Component.name})`;

      return Query;
    },
    useFetch,
  };
};

export default createFetch;
