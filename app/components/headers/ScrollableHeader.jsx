import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import startCase from 'lodash/startCase';
import map from 'lodash/map';

import { AppBar } from 'react-toolbox/lib/app_bar';
import Switch from 'react-toolbox/lib/switch';

import FilterMenu from 'components/content/FilterMenu';

import defaultTheme from './ScrollableHeader.scss';

class ScrollableHeader extends Component {
	render() {
		const {
			theme,
			filters,
			isSortActive,
			onFilterItemClick,
			onSortClick
		} = this.props;
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
						onFilterItemClick={onFilterItemClick}
					/>
					<FilterMenu
						label={'Tags'}
						menuItems={tagMenuItems}
						onFilterItemClick={onFilterItemClick}
					/>
					<div className={theme.sortSection}>
						<span className={theme.filterLabel}>Sort:</span>
						<Switch
							theme={theme}
							checked={isSortActive}
							label="Years"
							onChange={onSortClick}
						/>
					</div>
				</AppBar>
			</Fragment>
		);
	}
}

const ThemedScrollableHeader = themr('ScrollableHeader', defaultTheme)(
	ScrollableHeader
);
export default ThemedScrollableHeader;
