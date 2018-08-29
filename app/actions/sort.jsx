/**
 *	Action Creator: SortActions
 *	-	All Action Creators within the app have this signature.
		This helps in localising Code.
 */
class SortActions {
	static SORT_IMAGES = 'SORT_IMAGES';

	static sortResults = flag => ({
		type: SortActions.SORT_IMAGES,
		sortByYearFlag: flag
	});
}

export default SortActions;
