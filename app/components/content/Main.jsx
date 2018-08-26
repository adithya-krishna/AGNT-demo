import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
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
		const windowBottomn = this.hasScrolledToBottom();
		if (windowBottomn) {
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
					{map(results, result => (
						<Card
							avatar={result.user.profile_image.small}
							user={result.user.name}
							userSubtitle={result.user.instagram_username}
							key={`check-${result.id}`}
							raised
							theme={theme}
							title={result.user.name}
							subtitle={result.description}
							image={result.urls.regular}
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
