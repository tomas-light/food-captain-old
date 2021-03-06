import { controllerMiddleware } from 'app-redux-utils';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';

import { ApiInterceptor } from './ApiInterceptor';
import { controllerWatchers } from './redux/controllerWatchers';
import { getReducers } from './redux/getReducers';
import { configureTranslation } from './translation';

function configureApp() {
  const composer = getComposer();

  const history: History = createBrowserHistory();
  const reducers = makeReducers(history);

  const middleware = makeMiddleware(history);
  const enhancer = composer(middleware);

  const store = createStore(reducers, enhancer);

  ApiInterceptor.init(store.dispatch);

  configureTranslation();

  return {
    store,
    history,
  };
}

function getComposer() {
  const devtoolsComposer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
  if (devtoolsComposer) {
    return devtoolsComposer;
  }

  return compose;
}

function makeReducers(history: History) {
  const reducers = getReducers(history);
  return combineReducers(reducers);
}

function makeMiddleware(history: History) {
  return applyMiddleware(
    routerMiddleware(history),
    controllerMiddleware(controllerWatchers)
  );
}

export { configureApp };
