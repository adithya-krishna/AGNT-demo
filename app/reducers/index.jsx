import map from 'lodash/map';
import reduce from 'lodash/reduce';
import { combineReducers } from 'redux';

const convertToObject = (inputArray, reduceBy = 'id') => {
	return reduce(
		inputArray,
		(result, item) => {
			return {
				...result,
				[item[reduceBy]]: item
			};
		},
		{}
	);
};

const images = (state = {}, action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			const { results } = action.payload;
			const normalizedResults = convertToObject(results);
			console.log(normalizedResults);
			return {
				...state,
				...normalizedResults
			};
		}
		default:
			return state;
	}
};

const totalPages = (state = 0, action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			return action.payload.total_pages;
		}
		default:
			return state;
	}
};

const totalResults = (state = 0, action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			return action.payload.total;
		}
		default:
			return state;
	}
};

const listById = (state = [], action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			return [
				...state,
				...map(action.payload.results, result => result.id)
			];
		}
		default:
			return state;
	}
};

//selectors
export const getAllImages = state =>
	map(state.listById, id => state.images[id]);

const combinedImages = combineReducers({
	images,
	totalPages,
	totalResults,
	listById
});

// total_pages, total_results, images, listById: { all, filters: { year: {ids: [], isFetching: false}, tags: {ids:  [], isFetching: false} } }

export default combinedImages;
