import SearchActions from 'actions/search';

const searchText = (state = '', action) => {
	switch (action.type) {
		case SearchActions.SEARCH_TEXT: {
			state = action.searchText;
		}
		default:
			return state;
	}
};

export default searchText;
