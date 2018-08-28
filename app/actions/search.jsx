import Adapter from 'server/Adapter';

class SearchActions {
	static SEARCH_COMPLETE = 'SEARCH_COMPLETE';
	static SEARCH_TEXT = 'SEARCH_TEXT';

	static setSearchString = query => {
		return {
			type: SearchActions.SEARCH_TEXT,
			searchString: query
		};
	};
	static searchApi = (query, page = 1) => {
		return async dispatch => {
			const base = `search/photos?page=${page}&query=${query}`;
			const check = await Adapter.get(base);
			const payload = check.data;

			dispatch({
				type: SearchActions.SEARCH_COMPLETE,
				payload
			});
		};
	};
}

export default SearchActions;
