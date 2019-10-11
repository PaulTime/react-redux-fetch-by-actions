import React, { DependencyList, ReactElement, ReactNode, ElementType } from 'react';
import { PromiseListener, Config, AsyncFunction } from 'redux-promise-listener';

import useAsyncFunction  from './useAsyncFunction';

import { Options } from 'types';

interface Props extends Config {
  when?: boolean;
  loader?: boolean;
  loaderElement?: ReactElement | ReactNode;
  watch?: DependencyList;
  children?: ReactElement | ReactNode;
  promiseListener: PromiseListener;
}

const Query: React.FC<Props> = ({
  // listener props
  start,
  resolve,
  reject,
  getPayload,
  getError,
  setPayload,
  // query props
  when,
  loader,
  loaderElement,
  watch,
  children,
  promiseListener,
}) => {
  const currentFn = React.useRef<AsyncFunction | undefined>();
  const asyncFn = useAsyncFunction(
    { start, resolve, reject, getPayload, getError, setPayload } , promiseListener,
  );

  const [state, setState] =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    React.useState<{ loading: boolean; injected: any }>({ loading: when, injected: {} });

  const unsubscribeFromActions = (): void => {
    if (currentFn.current) currentFn.current.unsubscribe();
  };

  const fetch = (): void => {
    unsubscribeFromActions();

    currentFn.current = asyncFn(state.injected)
      .then((fetched: any = {}) => { // eslint-disable-line @typescript-eslint/no-explicit-any

        setState({ loading: false, injected: fetched });
      })
      .catch( (error) => {
        console.error(error);

        setState({ ...state, loading: false });
      });
  };

  React.useEffect(() => {
    setState({ ...state, loading: when });

    if (when) {
      fetch();
    }

    return unsubscribeFromActions;
  }, watch);

  if (loader && state.loading) {
    return loaderElement;
  }

  return React.cloneElement(
    children,
    { loading: state.loading, ...state.injected },
  );
};

Query.defaultProps = {
  when: false,
  loader: true,
  loaderElement: null,
  watch: [],
};

type TCreateFetch = (a: PromiseListener, b: Options) =>
  (p: Props) => (Component: ElementType) => ReactElement;

export const createFetch: TCreateFetch = (promiseListener, { defaultLoader }) => {
  return (props) =>
    (Component): ReactElement => (
      <Query promiseListener={promiseListener} loaderElement={defaultLoader} {...props}>
        <Component {...props} />
      </Query>
    );
};
