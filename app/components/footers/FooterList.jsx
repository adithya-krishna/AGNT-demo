import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import cn from 'classnames';
import map from 'lodash/map';

import defaultTheme from './FooterList.scss';

class FooterList extends Component {
	renderIcons = () => {
		// react would fail with this.
		// components must be named with capital letters
		const { links: Links, theme } = this.props;

		return map(Links, (Link, index) => {
			return (
				<li
					className={cn(theme.link, theme.iconLink)}
					key={`link-${index}`}
				>
					<Link />
				</li>
			);
		});
	};
	render() {
		const { theme, title, links, horizontal, icons } = this.props;
		const titleClassNames = cn(theme.title, theme.link);
		const wrapperClasses = cn(
			{ [theme.icons]: icons },
			{ [theme.horizontal]: horizontal },
			theme.footerList
		);
		return (
			<ul className={wrapperClasses}>
				{title && <li className={titleClassNames}>{title}</li>}
				{icons
					? this.renderIcons()
					: map(links, (link, index) => (
							<li className={theme.link} key={`${link}-${index}`}>
								{link}
							</li>
					  ))}
			</ul>
		);
	}
}

const ThemedFooterList = themr('FooterList', defaultTheme)(FooterList);
export default ThemedFooterList;
