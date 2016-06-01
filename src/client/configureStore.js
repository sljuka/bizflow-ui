import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './common/app/reducer';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
  const middleware = [
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    thunk
  ];

  const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./common/app/reducer', () => {
      const nextReducer = require('./common/app/reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
