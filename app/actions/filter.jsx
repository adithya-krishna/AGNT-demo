class FilterActions {
	static FILTER_IMAGES = 'FILTER_IMAGES';

	static filterResults = (filterText, filterBy) => ({
		type: FilterActions.FILTER_IMAGES,
		filterBy,
		filterText
	});
}

export default FilterActions;
