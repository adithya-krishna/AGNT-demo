import map from 'lodash/map';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import snakeCase from 'lodash/snakeCase';

import { combineReducers } from 'redux';
import moment from 'moment';

import * as helpers from './_helpers';

const allImages = (state = [], action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			const currentIds = map(action.payload.results, result => result.id);
			return [...state, ...currentIds];
		}
		default:
			return state;
	}
};

const byYears = (state = {}, action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			const uniqueYears = helpers.getUniqueYears(action.payload);

			let byYear = {};
			forEach(uniqueYears, year => {
				const yearEntryName = year.get('year');
				byYear = {
					...byYear,
					[yearEntryName]: map(
						filter(action.payload.results, result =>
							moment(result.created_at).isSame(year, 'year')
						),
						i => i.id
					)
				};
			});
			return byYear;
		}
		default:
			return state;
	}
};

const byTags = (state = [], action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			const uniqueTags = helpers.getUniqueTags(action.payload);

			let byTags = {};
			forEach(uniqueTags, tag => {
				byTags = {
					...byTags,
					[snakeCase(tag)]: map(
						filter(action.payload.results, result => {
							const mappedTags = map(result.tags, t => t.title);
							return includes(mappedTags, tag);
						}),
						i => i.id
					)
				};
			});
			return byTags;
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
