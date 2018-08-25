import React from 'react';
import { themr } from 'react-css-themr';

import defaultTheme from './ViewportContainer.scss';

const ViewportContainer = ({ theme, children }) => (
	<div className={theme.container}>{children}</div>
);

const ThemedViewportContainer = themr('ViewportContainer', defaultTheme)(
	ViewportContainer
);
export default ThemedViewportContainer;
