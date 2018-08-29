import map from 'lodash/map';

import { combineReducers } from 'redux';

import images from './images';
import pages from './pages';
import lists from './lists';
import filters from './filters';
import searchText from './searchText';

//selectors
export const getAllImages = state =>
	map(state.lists.allImages, id => state.images[id]);

const combinedImages = combineReducers({
	images,
	pages,
	lists,
	searchText,
	filters
});

export default combinedImages;
