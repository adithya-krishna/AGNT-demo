import SortActions from 'actions/sort';

const sortByYears = (state = false, action) => {
	switch (action.type) {
		case SortActions.SORT_IMAGES: {
			return action.sortByYearFlag;
		}
		default:
			return state;
	}
};

export default sortByYears;
