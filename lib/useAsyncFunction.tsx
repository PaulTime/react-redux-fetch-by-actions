import * as React from 'react';
import { AsyncFunction, PromiseListener, Config } from 'redux-promise-listener';

export default function useAsyncFunction(config: Config, listener: PromiseListener): AsyncFunction {
  const { start, resolve, reject, setPayload, getPayload, getError } = config;

  const createAsyncFunction = () =>
    listener.createAsyncFunction({
      start,
      resolve,
      reject,
      setPayload,
      getPayload,
      getError
    });

  const [asyncFunction: AsyncFunction, setAsyncFunction] = React.useState(createAsyncFunction());

  React.useEffect(
    () => {
      asyncFunction.unsubscribe();
      setAsyncFunction(createAsyncFunction());

      return () => { asyncFunction.unsubscribe(); }
    },
    [start, resolve, reject]
  );

  // asyncFunction.asyncFunction asyncFunction.unsubscribe
  return asyncFunction
}