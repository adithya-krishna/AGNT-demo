import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import startCase from 'lodash/startCase';
import map from 'lodash/map';

import { AppBar } from 'react-toolbox/lib/app_bar';

import FilterMenu from 'components/content/FilterMenu';

import FilterActions from 'actions/filter';

import defaultTheme from './ScrollableHeader.scss';

class ScrollableHeader extends Component {
	onFilterItemClick = (e, component) => {
		const { filterResults } = this.props;
		// An issue with react toolbox is causing this
		// I use the proxy component to get value
		// instead of e.target.value or using onSelect
		// as shown in the docs
		filterResults(component.props.value, component.props.section);
	};

	render() {
		const { theme, filters } = this.props;
		const yearMenuItems = map(filters.years, year => year.get('year'));
		const tagMenuItems = map(filters.tags, tag => startCase(tag));
		return (
			<Fragment>
				<AppBar
					theme={theme}
					className={classnames(theme.filter)}
					fixed
				>
					<span className={theme.filterLabel}>Filters:</span>

					<FilterMenu
						label={'Years'}
						menuItems={yearMenuItems}
						onFilterItemClick={this.onFilterItemClick}
					/>
					<FilterMenu
						label={'Tags'}
						menuItems={tagMenuItems}
						onFilterItemClick={this.onFilterItemClick}
					/>
				</AppBar>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		filters: state.filters
	};
};

const ThemedScrollableHeader = themr('ScrollableHeader', defaultTheme)(
	ScrollableHeader
);
export default connect(
	mapStateToProps,
	{ filterResults: FilterActions.filterResults }
)(ThemedScrollableHeader);
