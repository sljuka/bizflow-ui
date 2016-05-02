import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(preloadedState) {
  const middleware = {};

  const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../common/rootReducer', () => {
      const nextReducer = require('./rootReducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
