import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';

import { AppBar } from 'react-toolbox/lib/app_bar';
import MenuButton from 'components/buttons/MenuButton';
import { MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { FontIcon } from 'react-toolbox/lib/font_icon';

import defaultTheme from './ScrollableHeader.scss';

class ScrollableHeader extends Component {
	render() {
		const { theme } = this.props;
		return (
			<Fragment>
				<AppBar
					theme={theme}
					className={classnames(theme.filter)}
					fixed
				>
					<span className={theme.filterLabel}>Filters:</span>
					<MenuButton
						label={'Year'}
						rightIcon={<FontIcon value={'keyboard_arrow_down'} />}
						position="topLeft"
						menuRipple
						theme={theme}
					>
						<MenuItem
							value="download"
							icon="get_app"
							caption="Download"
						/>
					</MenuButton>
					<MenuButton
						label={'Tags'}
						rightIcon={<FontIcon value={'keyboard_arrow_down'} />}
						position="topLeft"
						menuRipple
						theme={theme}
					>
						<MenuItem
							value="download"
							icon="get_app"
							caption="Download"
						/>
					</MenuButton>
				</AppBar>
			</Fragment>
		);
	}
}

const ThemedScrollableHeader = themr('ScrollableHeader', defaultTheme)(
	ScrollableHeader
);
export default ThemedScrollableHeader;
