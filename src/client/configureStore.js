import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './common/app/reducer';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

export default function configureStore(preloadedState) {
  const logger = createLogger({ stateTransformer: (state) => {
    const normalState = Object.keys(state).reduce((obj, key) => {
      obj[key] = state[key].toJS(); // eslint-disable-line no-param-reassign
      return obj;
    }
    , {});
    return normalState;
  } });

  const middleware = [
    thunk,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR']
    }),
    logger
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
