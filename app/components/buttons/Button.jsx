import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import cn from 'classnames';

import { Button as RTButton } from 'react-toolbox/lib/button';

import defaultTheme from './Button.scss';

const Button = ({ theme, label, icon, select, classNames, ...others }) => {
	const customClassNames = cn(
		{ [theme.select]: select },
		...(classNames ? classNames : {})
	);
	return (
		<RTButton
			theme={theme}
			icon={icon}
			label={label}
			className={customClassNames}
			{...others}
		/>
	);
};

const ThemedButton = themr('Button', defaultTheme)(Button);
export default ThemedButton;
