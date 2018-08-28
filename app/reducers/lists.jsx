import map from 'lodash/map';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import snakeCase from 'lodash/snakeCase';

import { combineReducers } from 'redux';
import moment from 'moment';

import SearchActions from 'actions/search';

import * as helpers from './_helpers';

const allImages = (state = [], action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			const currentIds = map(action.payload.results, result => result.id);
			return [...state, ...currentIds];
		}
		default:
			return state;
	}
};

const byYears = (state = {}, action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			const uniqueYears = helpers.getUniqueYears(action.payload);

			let byYear = {};
			forEach(uniqueYears, year => {
				const yearEntryName = year.get('year');
				const idsFilteredByYear = filter(
					action.payload.results,
					result => moment(result.created_at).isSame(year, 'year')
				);
				const idsList = map(idsFilteredByYear, i => i.id);
				byYear = {
					...byYear,
					[yearEntryName]: [
						...(state[yearEntryName] || []),
						...idsList
					]
				};
			});
			return { ...state, ...byYear };
		}
		default:
			return state;
	}
};

const byTags = (state = [], action) => {
	switch (action.type) {
		case SearchActions.SEARCH_COMPLETE: {
			const uniqueTags = helpers.getUniqueTags(action.payload);

			let byTags = {};
			forEach(uniqueTags, tag => {
				const snakeCaseTagName = snakeCase(tag);
				const idsFilteredByYear = filter(
					action.payload.results,
					result => {
						const mappedTags = map(result.tags, t => t.title);
						return includes(mappedTags, tag);
					}
				);
				const idsList = map(idsFilteredByYear, i => i.id);

				byTags = {
					...byTags,
					[snakeCaseTagName]: [
						...(state[snakeCaseTagName] || []),
						...idsList
					]
				};
			});
			return { ...state, ...byTags };
		}
		default:
			return state;
	}
};

export default combineReducers({
	allImages,
	byYears,
	byTags
});
