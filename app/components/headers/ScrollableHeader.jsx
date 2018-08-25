import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';

import { AppBar } from 'react-toolbox/lib/app_bar';

import defaultTheme from './ScrollableHeader.scss';

class ScrollableHeader extends Component {
	render() {
		const { theme } = this.props;
		return (
			<Fragment>
				<AppBar
					theme={theme}
					className={classnames(theme.banner)}
					fixed
				/>
				<AppBar
					theme={theme}
					className={classnames(theme.filter)}
					fixed
				/>
			</Fragment>
		);
	}
}

const ThemedScrollableHeader = themr('ScrollableHeader', defaultTheme)(
	ScrollableHeader
);
export default ThemedScrollableHeader;
