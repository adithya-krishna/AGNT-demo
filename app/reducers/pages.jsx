/**
 *	Reducer: pages
 */
import { combineReducers } from 'redux';

import SearchActions from 'actions/search';

const totalPages = (state = 0, action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			return action.payload.total_pages;
		}
		default:
			return state;
	}
};

const totalResults = (state = 0, action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			return action.payload.total;
		}
		default:
			return state;
	}
};

export default combineReducers({
	totalPages,
	totalResults
});
