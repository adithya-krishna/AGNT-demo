const reducer = (state = {}, action) => {
	switch (action.type) {
		case 'SEARCH_TEXT': {
			return {
				...state,
				searchString: action.searchString
			};
		}
		case 'SEARCH_COMPLETE': {
			return {
				...state,
				results: [
					...(state.results
						? [...state.results, ...action.payload.results]
						: [...action.payload.results])
				]
			};
		}
		default:
			return state;
	}
};

export default reducer;
