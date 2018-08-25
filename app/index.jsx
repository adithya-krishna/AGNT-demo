/**
 *	AGNT - demo
 *	-	Point of entry (containes babel polyfills)
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'components/root';

const rootDiv = document.createElement('div');
rootDiv.setAttribute('id', 'root');

ReactDOM.render(<Root />, document.body.appendChild(rootDiv));
