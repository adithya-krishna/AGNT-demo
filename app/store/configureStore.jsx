/**
 *	Store Configuration
 *	-	Composing with the redux store with root reducers.
 *	-	Redux dev tools is added here.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = {};
export default function configureStore() {
	const store = createStore(
		rootReducer,
		initialStore,
		composeEnhancers(applyMiddleware(thunk))
	);
	return store;
}
