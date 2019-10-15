import {DependencyList, ElementType, ReactElement} from 'react';
import { PromiseListener, Config } from 'redux-promise-listener';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface Options {
  defaultLoader: ReactElement;
}

export interface QueryConfig {
  filter?: (props: Any) => boolean;
  loader?: boolean;
  loaderElement?: ReactElement;
  children?: ReactElement;
  promiseListener: PromiseListener;
}

export interface FetchState { loading: boolean; injected: Any; error?: Error }

export type TUseFetch = (config: Config & { when: boolean; watch: DependencyList; payload: Any })
  => FetchState;

export type CreateFetchFactory = {
  fetchDecorator: (Component: ElementType) => ElementType;
  useFetch: TUseFetch;
};

export type TCreateFetch = (a: PromiseListener, b: Options) =>
  (o: Config & QueryConfig) => CreateFetchFactory