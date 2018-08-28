import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import startCase from 'lodash/startCase';
import map from 'lodash/map';

import { AppBar } from 'react-toolbox/lib/app_bar';

import FilterMenu from 'components/content/FilterMenu';

import defaultTheme from './ScrollableHeader.scss';

class ScrollableHeader extends Component {
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

					<FilterMenu label={'Years'} menuItems={yearMenuItems} />
					<FilterMenu label={'Tags'} menuItems={tagMenuItems} />
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
export default connect(mapStateToProps)(ThemedScrollableHeader);
