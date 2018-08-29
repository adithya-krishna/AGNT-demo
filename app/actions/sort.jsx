class SortActions {
	static SORT_IMAGES = 'SORT_IMAGES';

	static sortResults = flag => ({
		type: SortActions.SORT_IMAGES,
		sortByYearFlag: flag
	});
}

export default SortActions;
