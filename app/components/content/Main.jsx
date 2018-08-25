import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import classnames from 'classnames';
import map from 'lodash/map';

import ViewportContainer from 'components/content/ViewportContainer';
import Card from 'components/content/Card';

import defaultTheme from './Main.scss';

class Main extends Component {
	render() {
		const { theme } = this.props;
		return (
			<article className={theme.pageWrapper}>
				<ViewportContainer theme={theme}>
					<Card
						theme={theme}
						title={'title'}
						subtitle={'subtitle'}
						image={'https://placeimg.com/640/480/any'}
						cardText={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
						}
					/>
					<Card
						theme={theme}
						title={'title'}
						subtitle={'subtitle'}
						image={'https://placeimg.com/800/450/nature'}
						cardText={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
						}
					/>
					<Card
						theme={theme}
						title={'title'}
						subtitle={'subtitle'}
						image={'https://placeimg.com/640/480/people'}
						cardText={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
						}
					/>
					<Card
						theme={theme}
						title={'title'}
						subtitle={'subtitle'}
						image={'https://placeimg.com/640/480/any'}
						cardText={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
						}
					/>
					<Card
						theme={theme}
						title={'title'}
						subtitle={'subtitle'}
						image={'https://placeimg.com/800/450/nature'}
						cardText={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
						}
					/>
					<Card
						theme={theme}
						title={'title'}
						subtitle={'subtitle'}
						image={'https://placeimg.com/640/480/people'}
						cardText={
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
						}
					/>
				</ViewportContainer>
			</article>
		);
	}
}

const ThemedMain = themr('Main', defaultTheme)(Main);
export default ThemedMain;
