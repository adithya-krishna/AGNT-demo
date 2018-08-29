import React from 'react';
import { themr } from 'react-css-themr';
import cn from 'classnames';
import MenuButton from 'components/buttons/MenuButton';
import { MenuItem } from 'react-toolbox/lib/menu';
import { FontIcon } from 'react-toolbox/lib/font_icon';
import map from 'lodash/map';
import toString from 'lodash/toString';
import snakeCase from 'lodash/snakeCase';

import defaultTheme from './FilterMenu.scss';
import { isNumeric } from '_utils';

const FilterMenu = ({
	label,
	rightIcon = <FontIcon value={'keyboard_arrow_down'} />,
	position = 'topLeft',
	theme,
	onFilterItemClick,
	menuItems = [],
	isLast
}) => {
	return (
		<MenuButton
			className={cn({ [theme.last]: isLast })}
			label={label}
			rightIcon={rightIcon}
			position={position}
			menuRipple
			theme={theme}
		>
			<MenuItem
				theme={theme}
				key={`showAll-neg1`}
				section={''}
				value={'show_all'}
				caption={'Show All'}
				onClick={onFilterItemClick}
			/>
			{map(menuItems, (menuItem, index) => {
				const value = isNumeric(menuItem)
					? menuItem
					: snakeCase(menuItem);
				const caption = toString(menuItem);
				return (
					<MenuItem
						theme={theme}
						key={`${menuItem}-${index}`}
						section={label}
						value={value}
						caption={caption}
						onClick={onFilterItemClick}
					/>
				);
			})}
		</MenuButton>
	);
};

const ThemedFilterMenu = themr('FilterMenu', defaultTheme)(FilterMenu);
export default ThemedFilterMenu;
