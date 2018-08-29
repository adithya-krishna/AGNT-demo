import Adapter from 'server/Adapter';

class SearchActions {
	static SEARCH_COMPLETE = 'SEARCH_COMPLETE';
	static SEARCH_TEXT = 'SEARCH_TEXT';
	static CLEAR_IMAGES = 'CLEAR_IMAGES';

	static setSearchString = query => ({
		type: SearchActions.SEARCH_TEXT,
		searchText: query
	});

	static clearImages = () => ({
		type: SearchActions.CLEAR_IMAGES
	});

	static searchApi = (query, page = 1, perPage = 12) => {
		return async dispatch => {
			const base = `search/photos?per_page=${perPage}&page=${page}&query=${query}`;
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
