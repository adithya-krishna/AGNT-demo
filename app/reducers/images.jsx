import map from 'lodash/map';
import reduce from 'lodash/reduce';

import moment from 'moment';

const modifyAndNormalizeResult = (inputArray, reduceBy = 'id') => {
	return reduce(
		inputArray,
		(result, item) => {
			return {
				...result,
				[item[reduceBy]]: {
					...item,
					created_at: moment(item.created_at),
					tags: map(item.tags, tag => tag.title)
				}
			};
		},
		{}
	);
};

const images = (state = {}, action) => {
	switch (action.type) {
		case 'SEARCH_COMPLETE': {
			const { results } = action.payload;
			const normalizedResults = modifyAndNormalizeResult(results);
			return {
				...state,
				...normalizedResults
			};
		}
		default:
			return state;
	}
};

export default images;
