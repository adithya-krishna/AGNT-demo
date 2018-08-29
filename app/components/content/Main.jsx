import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';

import ViewportContainer from 'components/content/ViewportContainer';
import Card from 'components/content/Card';

import SearchActions from 'actions/search';
import { getAllImages } from 'reducers';

import defaultTheme from './Main.scss';

const counter = () => {
	var index = 2; // start from page 2
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
		const { searchApi, searchText } = this.props;
		const windowBottom = this.hasScrolledToBottom();
		if (windowBottom & !isEmpty(searchText)) {
			searchApi(searchText, generateIndex());
		}
	};

	componentDidMount = () => {
		window.addEventListener('scroll', this.onScroll, false);
	};

	componentWillUnmount = () => {
		window.removeEventListener('scroll', this.onScroll, false);
	};

	render() {
		const { theme, images } = this.props;

		return (
			<article className={theme.pageWrapper}>
				<ViewportContainer theme={theme}>
					{map(images, (image, index) => (
						<Card
							theme={theme}
							raised
							avatar={image.user.profile_image.small}
							user={image.user.name}
							userSubtitle={image.user.instagram_username}
							key={`${image.id}-${index}`}
							image={image.urls.regular}
							fullImage={image.urls.full}
							likes={image.likes}
							portfolioUrl={image.user.portfolio_url}
							cardText={image.user.bio}
						/>
					))}
				</ViewportContainer>
			</article>
		);
	}
}

const mapStateToProps = state => {
	return {
		images: getAllImages(state),
		searchText: state.searchText
	};
};

const ThemedMain = themr('Main', defaultTheme)(Main);
export default connect(
	mapStateToProps,
	{ searchApi: SearchActions.searchApi }
)(ThemedMain);
