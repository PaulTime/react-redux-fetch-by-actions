# react-redux-fetch-by-actions

Lightweight(*1kb gzip*) helpers (**hook, hoc**) for dispatching action types and handling loading inside your components.
Based on [redux-promise-listener](https://www.npmjs.com/package/redux-promise-listener)
and [react-redux-promise-listener-hook](https://www.npmjs.com/package/react-redux-promise-listener-hook)
packages

## Peer dependencies

1. redux-promise-listener
2. react-redux-promise-listener-hook
3. redux
4. react-redux
5. react

## Installation and setup
``` npm i react-redux-fetch-by-actions```

```$xslt
// store.js
import { createStore, applyMiddleware } from 'redux';
import createReduxPromiseListener from 'redux-promise-listener';

const reduxPromiseListener = createReduxPromiseListener();
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...otherMiddleware, reduxPromiseListener.middleware),
);
export const promiseListener = reduxPromiseListener; // <---- ⚠️ IMPORTANT ⚠️

export default store;

// fetchService.js
import createFetch from 'react-redux-fetch-by-actions';
import { promiseListener } from 'store';

const { fetchDecorator, useFetch } = createFetch(promiseListener);
export { fetchDecorator, useFetch };

// Component.jsx
import React from 'react';

import Loader from 'components/Loader';
import { useDidUpdate } from 'some-hooks-lib';
import { useFetch } from 'fetchService';

const Component = ({ id }) => {
  const { injected, loading, fetch } = useFetch({
    start: 'start-action-type',
    resolve: 'resolve-action-type',
    payload: { id }, // payload to be passed in start action, merged with prevoius injected state
  });

  useDidUpdate(() => { fetch() }, [id]); // fetch on props update, optional
    
  if (loading) return <Loader />;
    
  return (
    <div>
      {injected}
      <button onClick={fetch}>repeat</button> // mutation, fetch as a callback
    </div>
  );
};

```


