import { DependencyList, useRef, useEffect, useState } from 'react';
import { Config, PromiseListener } from 'redux-promise-listener';
import useAsyncFunction from 'react-redux-promise-listener-hook';

import { Any, TUseFetch, FetchState as TState } from 'types';

export const createUseFetch = (listener: PromiseListener): TUseFetch =>
  (config: Config & { when: boolean; watch: DependencyList; payload: Any }): TState => {
    const { when, watch, payload } = config;

    const asyncFn = useAsyncFunction(config, listener);

    const currentFetch = useRef<number | undefined>();
    const [state, setState] = useState<TState>({ loading: when, injected: {} });

    const fetch = (fetchId: number): void => {
      asyncFn(payload)
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

    useEffect(() => {
      setState({ ...state, loading: when });

      if (when) {
        fetch(currentFetch.current);
      }

      return (): void => currentFetch.current = undefined;
    }, watch || []);

    return state;
  };
