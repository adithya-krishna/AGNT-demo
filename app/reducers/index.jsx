import map from 'lodash/map';

import { combineReducers } from 'redux';

import images from './images';
import pages from './pages';
import lists from './lists';
import filters from './filters';
import * as helpers from './_helpers';

//selectors
export const getAllImages = state =>
	map(state.lists.allImages, id => state.images[id]);

const combinedImages = combineReducers({
	images,
	pages,
	lists,
	filters
});

export default combinedImages;
