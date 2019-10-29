import { ElementType, ReactElement } from 'react';
import { PromiseListener, Config } from 'redux-promise-listener';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

export interface FactoryOptions {
  defaultLoader?: ReactElement;
}

export interface QueryConfig {
  initialFilter?: (props: Any) => boolean;
  loader?: boolean;
  loaderElement?: ReactElement;
}

export interface FetchState<I = Any>{ loading: boolean; data: I; error?: Error }

export type TUseFetch = <Payload = Any>(config: Config & { initialLoading?: boolean; payload?: Any })
  => FetchState<Payload> & { fetch: () => void };

export type FetchFactory = {
  fetchDecorator: (config: Config & QueryConfig) => (Component: ElementType) => ElementType;
  useFetch: TUseFetch;
};

export type TCreateFetch = (a: PromiseListener, b?: FactoryOptions) => FetchFactory

export default function createFetch(a: PromiseListener, b?: FactoryOptions): FetchFactory;