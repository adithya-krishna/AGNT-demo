import map from 'lodash/map';
import reduce from 'lodash/reduce';
import uniq from 'lodash/uniq';
import snakeCase from 'lodash/snakeCase';

import moment from 'moment';

export const filterUniqueDates = data => {
	const lookup = new Set();

	return data.filter(date => {
		const serialised = date.get('year');
		if (lookup.has(serialised)) {
			return false;
		} else {
			lookup.add(serialised);
			return true;
		}
	});
};

export const getUniqueYears = payload =>
	filterUniqueDates(
		map(payload.results, result => moment(result.created_at))
	);

export const getUniqueTags = payload =>
	uniq(
		reduce(
			payload.results,
			(result, item) => [
				...result,
				...map(item.tags, tag => snakeCase(tag.title)).slice(0, 2) //only picking 2 tags from the list
			],
			[]
		)
	);
