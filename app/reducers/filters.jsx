import uniq from 'lodash/uniq';
import * as helpers from './_helpers';
import { combineReducers } from 'redux';

import SearchActions from 'actions/search';

const years = (state = [], action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			const uniqueYears = helpers.getUniqueYears(action.payload);

			const nextState = helpers.filterUniqueDates([
				...state,
				...uniqueYears
			]);
			return nextState;
		}
		case SearchActions.CLEAR_IMAGES: {
			return [];
		}
		default:
			return state;
	}
};

const tags = (state = [], action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			const uniqueTags = helpers.getUniqueTags(action.payload);

			const nextState = uniq([...state, ...uniqueTags]);
			return nextState;
		}
		case SearchActions.CLEAR_IMAGES: {
			return [];
		}
		default:
			return state;
	}
};

export default combineReducers({
	years,
	tags
});
