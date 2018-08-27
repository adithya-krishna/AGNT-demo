import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import ViewportContainer from 'components/content/ViewportContainer';
import Card from 'components/content/Card';

import SearchActions from 'actions/search';

import defaultTheme from './Main.scss';

const counter = () => {
	var index = 1;
	return () => {
		return index++;
	};
};
const generateIndex = counter();

class Main extends Component {
	// we don't have to debouce on this.
	// ref: https://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
	hasScrolledToBottom = () => {
		var scrollTop =
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop;
		var scrollHeight =
			(document.documentElement &&
				document.documentElement.scrollHeight) ||
			document.body.scrollHeight;
		var clientHeight =
			document.documentElement.clientHeight || window.innerHeight;
		var scrolledToBottom =
			Math.ceil(scrollTop + clientHeight) >= scrollHeight;

		return scrolledToBottom;
	};

	onScroll = e => {
		const { searchApi, searchString } = this.props;
		const windowBottom = this.hasScrolledToBottom();
		if (windowBottom & !isEmpty(searchString)) {
			searchApi(searchString, generateIndex());
		}
	};

	componentDidMount = () => {
		window.addEventListener('scroll', this.onScroll, false);
	};

	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.onScroll, false);
	};

	render() {
		const { theme, results } = this.props;

		return (
			<article className={theme.pageWrapper}>
				<ViewportContainer theme={theme}>
					{/* <Card
						avatar={
							'https://images.unsplash.com/profile-1529543914107-73e38dcb3c9e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32&s=8fcc46d1696a67f91046e46d2d1613cc'
						}
						user={'Ricardo Mancía'}
						userSubtitle={'ricardomancia_'}
						raised
						theme={theme}
						subtitle={
							'If you use my photographs, give the respective credits.'
						}
						image={
							'https://images.unsplash.com/profile-1529543914107-73e38dcb3c9e'
						}
					/> */}

					{map(results, result => (
						<Card
							avatar={result.user.profile_image.small}
							user={result.user.name}
							userSubtitle={result.user.instagram_username}
							key={`check-${result.id}`}
							raised
							theme={theme}
							image={result.urls.regular}
							filename={`${result.id}-${Date.now()}`}
							fullImage={result.urls.full}
							likes={result.likes}
							portfolioUrl={result.user.portfolio_url}
							cardText={result.user.bio}
						/>
					))}
				</ViewportContainer>
			</article>
		);
	}
}

const mapStateToProps = state => {
	return state
		? {
				results: state.results,
				search: state.search
		  }
		: {};
};

const ThemedMain = themr('Main', defaultTheme)(Main);
export default connect(
	mapStateToProps,
	{ searchApi: SearchActions.searchApi }
)(ThemedMain);
