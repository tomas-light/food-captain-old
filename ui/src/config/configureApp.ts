import { controllerMiddleware } from 'app-redux-utils';
import { container } from 'cheap-di';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import { ApiInterceptor } from './ApiInterceptor';
import { controllerWatchers } from './redux/controllerWatchers';
import { getReducers } from './redux/getReducers';
import { configureTranslation } from './translation';

function configureApp() {
	const composer = getComposer();
	const reducers = makeReducers();
	const middleware = makeMiddleware();
	const enhancer = composer(middleware);

	const store = createStore(reducers, enhancer);

	ApiInterceptor.init(store.dispatch);

	configureTranslation();

	return store;
}

function getComposer() {
	const devtoolsComposer = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
	if (devtoolsComposer) {
		return devtoolsComposer;
	}

	return compose;
}

function makeReducers() {
	const reducers = getReducers();
	return combineReducers(reducers);
}

function makeMiddleware() {
	return applyMiddleware(controllerMiddleware(controllerWatchers, container));
}

export { configureApp };
