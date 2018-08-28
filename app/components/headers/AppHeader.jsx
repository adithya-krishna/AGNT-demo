import React, { Component, Fragment } from 'react';
import { themr } from 'react-css-themr';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

import { AppBar } from 'react-toolbox/lib/app_bar';
import InputField from 'components/forms/Field';

import defaultTheme from './AppHeader.scss';
import ScrollableHeader from 'components/headers/ScrollableHeader';

import SearchActions from 'actions/search';

class AppHeader extends Component {
	constructor(props) {
		super(props);

		this.state = { search: '' };

		this.searchApi = debounce(this.searchApi, 500);
	}

	searchApi = value => {
		const { searchApi, setSearchString } = this.props;

		setSearchString(value);
		searchApi(value, 1);
	};

	onFieldChange = e => {
		const { name, value } = e.target;

		this.setState({ [name]: value }, () => {
			this.searchApi(value);
		});
	};

	onClearClick = e => {
		this.setState({ search: '' });
	};

	render() {
		const { theme } = this.props;
		const { search } = this.state;
		const isSearchFilled = !isEmpty(search);
		return (
			<Fragment>
				<AppBar
					theme={theme}
					title={'AGNT'}
					rightIcon={'account_circle'}
					flat
					fixed
				>
					<InputField
						theme={theme}
						id={'search'}
						name={'search'}
						placeholder={'Search'}
						value={search}
						clearable={isSearchFilled}
						onFieldChange={this.onFieldChange}
						onClearClick={this.onClearClick}
					/>
				</AppBar>
				<ScrollableHeader />
			</Fragment>
		);
	}
}

const ThemedAppHeader = themr('AppHeader', defaultTheme)(AppHeader);
export default connect(
	null,
	{
		searchApi: SearchActions.searchApi,
		setSearchString: SearchActions.setSearchString
	}
)(ThemedAppHeader);
