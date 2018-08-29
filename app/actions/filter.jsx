/**
 *	Action Creator: FilterActions
 *	-	All Action Creators within the app have this signature.
		This helps in localising Code.
 */
class FilterActions {
	static FILTER_IMAGES = 'FILTER_IMAGES';

	static filterResults = (filterText, filterBy) => ({
		type: FilterActions.FILTER_IMAGES,
		filterBy,
		filterText
	});
}

export default FilterActions;
