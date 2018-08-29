/**
 *	Reducer: activeFilters
 *
 */
import { combineReducers } from 'redux';

import FilterActions from 'actions/filter';

const filterBy = (state = '', action) => {
	switch (action.type) {
		case FilterActions.FILTER_IMAGES: {
			return action.filterBy;
		}
		default:
			return state;
	}
};

const filterText = (state = '', action) => {
	switch (action.type) {
		case FilterActions.FILTER_IMAGES: {
			return action.filterText;
		}
		default:
			return state;
	}
};

export default combineReducers({
	filterBy,
	filterText
});
