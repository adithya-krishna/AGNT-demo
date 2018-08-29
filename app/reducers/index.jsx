import map from 'lodash/map';

import { combineReducers } from 'redux';

import images from './images';
import pages from './pages';
import lists from './lists';
import filters from './filters';
import searchText from './searchText';
import activeFilter from './activeFilter';

//selectors
export const getAllImages = state => {
	const { filterBy, filterText } = state.activeFilter;

	switch (filterBy) {
		case 'Years': {
			return map(state.lists.byYears[filterText], id => state.images[id]);
		}
		case 'Tags': {
			return map(state.lists.byTags[filterText], id => state.images[id]);
		}
		default:
			return map(state.lists.allImages, id => state.images[id]);
	}
};

const combinedImages = combineReducers({
	images,
	pages,
	lists,
	searchText,
	filters,
	activeFilter
});

export default combinedImages;
