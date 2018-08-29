/**
 *	Reducer: RootReducer
 *	-	combines all reducers to feed into the store.
		we can use combine reducers in multiple places.
		in this app, this I have chosen to separate
		reducers and implemented combine reducers in each.
	-	Such separation is not required. But i have done so
		just as a POC.
	-	The State tree is normalized.
 */
import map from 'lodash/map';
import moment from 'moment';

import { combineReducers } from 'redux';

import images from './images';
import pages from './pages';
import lists from './lists';
import filters from './filters';
import searchText from './searchText';
import activeFilter from './activeFilter';
import sortByYears from './sort';

// this would stutter since it is not memoized.
// With memoization we can increase performce.
const sortFunction = (left, right) =>
	moment(left.create_at).diff(moment(right.created_at));

//selectors
export const getAllImages = state => {
	const {
		sortByYears,
		activeFilter: { filterBy, filterText }
	} = state;

	switch (filterBy) {
		case 'Years': {
			const results = map(
				state.lists.byYears[filterText],
				id => state.images[id]
			);
			return sortByYears ? results.sort(sortFunction) : results;
		}
		case 'Tags': {
			const results = map(
				state.lists.byTags[filterText],
				id => state.images[id]
			);
			return sortByYears ? results.sort(sortFunction) : results;
		}
		default: {
			const results = map(state.lists.allImages, id => state.images[id]);
			return sortByYears ? results.sort(sortFunction) : results;
		}
	}
};

const combinedImages = combineReducers({
	images,
	pages,
	lists,
	searchText,
	filters,
	activeFilter,
	sortByYears
});

export default combinedImages;
