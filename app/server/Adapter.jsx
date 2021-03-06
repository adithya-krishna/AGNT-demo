/**
 *	HTTP Adapter
 *	-	Forcing a singleton class.
 */
import axios from 'axios';
import { BASE_URL, API_KEY } from 'constants/server';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class HTTPAdapter {
	constructor(enforcer, bearer = 'Client-ID') {
		if (enforcer !== singletonEnforcer) {
			throw 'Cannot construct singleton use the instance method instead';
		}

		this.bearer = bearer;
	}

	static get instance() {
		if (!this[singleton]) {
			this[singleton] = new HTTPAdapter(singletonEnforcer);
		}
		return this[singleton];
	}

	setBearers(bearer) {
		this.bearer = bearer;
	}

	getBearer() {
		return this.bearer || 'Client-ID';
	}

	getHeaders() {
		return {
			Authorization: `${this.getBearer()} ${API_KEY}`
		};
	}

	get(url, bearer) {
		if (bearer) {
			this.bearer = this.setBearers(bearer);
		}
		return axios({
			baseURL: BASE_URL,
			method: 'GET',
			url,
			headers: this.getHeaders()
		});
	}

	set(url, bearer) {
		if (bearer) {
			this.bearer = this.setBearers(bearer);
		}
		return axios({
			baseURL: BASE_URL,
			method: 'POST',
			url,
			headers: this.getHeaders()
		});
	}
}

const { instance: HTTPAdapterInstance } = HTTPAdapter;
export default HTTPAdapterInstance;
