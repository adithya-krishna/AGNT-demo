const reducer = (state = {}, action) => {
	switch (action.type) {
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
	}
};

export default reducer;
