import React from 'react';
import { themr } from 'react-css-themr';
import MenuButton from 'components/buttons/MenuButton';
import { MenuItem } from 'react-toolbox/lib/menu';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import map from 'lodash/map';
import toString from 'lodash/toString';

import defaultTheme from './FilterMenu.scss';

const FilterMenu = ({
	label,
	rightIcon = <FontIcon value={'keyboard_arrow_down'} />,
	position = 'topLeft',
	theme,
	menuItems = []
}) => {
	return (
		<MenuButton
			label={label}
			rightIcon={rightIcon}
			position={position}
			menuRipple
			theme={theme}
		>
			{map(menuItems, (menuItem, index) => (
				<MenuItem
					theme={theme}
					key={`${menuItem}-${index}`}
					value={toString(menuItem)}
					caption={toString(menuItem)}
				/>
			))}
		</MenuButton>
	);
};

const ThemedFilterMenu = themr('FilterMenu', defaultTheme)(FilterMenu);
export default ThemedFilterMenu;
