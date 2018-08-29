import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';

import { AppBar } from 'react-toolbox/lib/app_bar';

import InputField from 'components/forms/Field';
import defaultTheme from './AppHeader.scss';
import ScrollableHeader from 'components/headers/ScrollableHeader';

import FilterActions from 'actions/filter';
import SearchActions from 'actions/search';
import SortActions from 'actions/sort';

class AppHeader extends Component {
	constructor(props) {
		super(props);

		this.state = { search: '' };

		this.searchApi = debounce(this.searchApi, 500);
	}

	onFilterItemClick = (e, component) => {
		const { filterResults } = this.props;
		// An issue with react toolbox is causing this
		// I use the proxy component to get value
		// instead of e.target.value or using onSelect
		// as shown in the docs
		filterResults(component.props.value, component.props.section);
	};

	onSortClick = value => {
		const { sortResults } = this.props;
		sortResults(value);
	};

	searchApi = value => {
		const { searchApi, setSearchString } = this.props;

		setSearchString(value);
		searchApi(value, 1);
	};

	setSearchField = value => {
		this.setState({ search: value }, () => {
			if (value === '') {
				this.props.clearImages();
			}
			this.searchApi(value);
		});
	};

	onFieldChange = e => {
		const { value } = e.target;
		this.setSearchField(value);
	};

	onClearClick = e => {
		this.setSearchField('');
	};

	render() {
		const { theme, filters, sortByYears } = this.props;
		const { search } = this.state;
		const isSearchFilled = !isEmpty(search);
		return (
			<Fragment>
				<AppBar
					theme={theme}
					title={'AGNT'}
					rightIcon={'account_circle'}
					flat
					fixed
				>
					<InputField
						theme={theme}
						id={'search'}
						name={'search'}
						placeholder={'Search'}
						value={search}
						clearable={isSearchFilled}
						onFieldChange={this.onFieldChange}
						onClearClick={this.onClearClick}
					/>
				</AppBar>
				<ScrollableHeader
					filters={filters}
					isSortActive={sortByYears}
					onFilterItemClick={this.onFilterItemClick}
					onSortClick={this.onSortClick}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	filters: state.filters,
	sortByYears: state.sortByYears
});

const ThemedAppHeader = themr('AppHeader', defaultTheme)(AppHeader);
export default connect(
	mapStateToProps,
	{
		searchApi: SearchActions.searchApi,
		setSearchString: SearchActions.setSearchString,
		clearImages: SearchActions.clearImages,
		filterResults: FilterActions.filterResults,
		sortResults: SortActions.sortResults
	}
)(ThemedAppHeader);
