import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import map from 'lodash/map';

import { Input } from 'react-toolbox/lib/input';

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
	constructor(props) {
		super(props);

		this.state = {
			search: ''
		};

		this.seachAPI = debounce(this.seachAPI, 2000);
	}

	seachAPI = value => {
		const { searchApi } = this.props;
		searchApi(value, generateIndex());
	};

	onfieldChange = (value, e) => {
		this.seachAPI(value);
		this.setState({ search: value });
	};

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
		const { search } = this.state;
		const windowBottomn = this.hasScrolledToBottom();
		if (windowBottomn) {
			this.seachAPI(search);
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
		const { search } = this.state;

		return (
			<article className={theme.pageWrapper}>
				<Input
					type="text"
					label="field"
					value={search}
					onChange={this.onfieldChange}
				/>
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
							subtitle={result.user.bio}
							image={result.urls.regular}
							cardText={result.description}
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
				results: state.results
		  }
		: {};
};

const ThemedMain = themr('Main', defaultTheme)(Main);
export default connect(
	mapStateToProps,
	{ searchApi: SearchActions.searchApi }
)(ThemedMain);
