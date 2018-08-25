import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';

/*----------  grouping all components that are conatiners ----------*/
/*----------  This patteren is questionable. ----------*/
/*----------  But I have chosen this pattern to improve readability ----------*/
import AppHeader from 'components/headers/AppHeader';
import Main from 'components/content/Main';
import AppFooter from 'components/footers/AppFooter';

import './root.scss';

/*----------  Configuring Store  ----------*/
const store = configureStore();

/*----------  Wrapping redux Provider ----------*/
/*----------  Wrapping with Fragment results in much cleaner compiled html. ----------*/
export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<AppHeader />

					<Main />

					<AppFooter />
				</Fragment>
			</Provider>
		);
	}
}
