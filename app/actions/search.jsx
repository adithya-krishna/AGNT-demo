import Adapter from 'server/Adapter';

class Search {
	static setSearchString = query => {
		return {
			type: 'SEARCH_TEXT',
			searchString: query
		};
	};
	static searchApi = (query, page = 1) => {
		return async dispatch => {
			const base = `search/photos?page=${page}&query=${query}`;
			const check = await Adapter.get(base);
			const payload = check.data;

			dispatch({
				type: 'SEARCH_COMPLETE',
				payload
			});
		};
	};
}

export default Search;
