/**
 *	Reducer: sortByYear
	-	I have not created lists for sorting.
		This can be done if required.
 */
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
