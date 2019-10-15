/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-redux-promise-listener-hook' {
  import { Middleware, Action } from 'redux';

  export type SetPayload = (action: Action, payload: any) => Action;
  export type GetPayload = (action: Action) => any;

  export interface Config {
    start: string;
    resolve: string;
    reject: string;
    setPayload?: SetPayload;
    getPayload?: GetPayload;
    getError?: GetPayload;
  }


  export interface AsyncFunction {
    asyncFunction: (...args: Array<any>) => Promise<any>;
    unsubscribe: () => void;
  }


  export type PromiseListener = {
    middleware: Middleware;
    createAsyncFunction: (config: Config) => AsyncFunction;
  };


  export default function createListenerHook(config: Config, listener: PromiseListener):
    (...args: Array<any>) => Promise<any>;
}
/* eslint-enable */
