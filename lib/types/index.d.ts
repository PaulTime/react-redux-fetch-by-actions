import { ElementType, ReactElement } from 'react';
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

export type TCreateFetch = (a: PromiseListener, b: Options) =>
  (p: Config & QueryConfig) => (Component: ElementType) => ReactElement;