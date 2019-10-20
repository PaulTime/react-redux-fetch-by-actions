import { useRef, useEffect, useState } from 'react';
import { Config, PromiseListener } from 'redux-promise-listener';
import useAsyncFunction from 'react-redux-promise-listener-hook';

import { Any, FetchState } from 'types';

const defaultConfig = { initialLoading: true };

export const createUseFetch = (listener: PromiseListener) =>
  <Payload = Any>(config: Config & { initialLoading?: boolean; payload?: Payload }):
    FetchState<Payload> & { fetch: () => void } => {
    const {
      start,
      resolve,
      reject,
      setPayload,
      getPayload,
      getError,
      initialLoading,
      payload,
    } = { ...defaultConfig, ...config };

    const asyncFn = useAsyncFunction({ start, resolve, reject, setPayload, getPayload, getError }, listener);

    const currentFetch = useRef<number | undefined>();
    const [fetchId, setFetchId] = useState(Math.random());
    const [state, setState] = useState<FetchState>({ loading: initialLoading, injected: {} });
  
    const fetch = (fetchId: number): void => {
      asyncFn({ ...state, ...payload })
        .then((fetched: Payload) => {
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
      setFetchId(Math.random());
      setState({ injected: {}, error: undefined, loading: true });
    };

    useEffect(() => {
      if (state.loading) {
        currentFetch.current = Math.random();
        fetch(currentFetch.current);
      }

      return (): void => { currentFetch.current = Math.random() };
    }, [fetchId]);

    return { ...state, fetch: refetch };
  };
