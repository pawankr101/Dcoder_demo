import { UtilityService } from "./utility";
import { createBrowserHistory } from 'history'

export class ServerUtilityService {
	localConst = {};
	constructor() {
		this.utility = new UtilityService();
		this.history = createBrowserHistory({forceRefresh:true})
	}

	buildParam(params) {
		let paramString = '';
		this.utility.forLoop(params, (param, key) => {
			if(this.utility.isString(param)) {
				paramString += `${key}=${param}`
			}
		});
		return paramString ? `?${paramString}` : '';
	}

	buildHeader(commonHeader, headers) {
		commonHeader = commonHeader || new Headers();
		this.utility.forLoop(headers, (header, key) => {
			if(this.utility.isString(header)) {
				commonHeader.append(key, header);
			}
		});
		return commonHeader;
	}

	getRequest(apiEndUrl, options) {
		return new Promise((resolve, reject) => {
			if(!this.utility.isString(apiEndUrl)) {
				reject({
					message: "'apiEndUrl' must be string"
				});
			}
			let url = apiEndUrl + (this.utility.getValue(options, 'params') ? this.buildParam(options.params) : '');
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			if(this.utility.getValue(options, 'headers')) {
				headers = this.buildHeader(headers, options.headers)
			}
			let jwt = this.utility.getFromLocalStorage('jwt_token');
			headers.append('Authorization', `Bearer ${jwt}`);
			let status = null;
			fetch(url, {
				method: 'GET',
				headers: headers
			}).then(result => {
				status = (`${result.status}`[0] === '2') ? 'success' : 'error'
				if(this.history.location.pathname !== '/login' && result.status === 401) {
					this.history.push('/login')
				} else {
					return result.json();
				}
			}).then(resultData => {
				resolve({status: status, data: resultData});
			}).catch(error => {
				reject(error);
			});
		});
	}

	postRequest(apiEndUrl, payload, options) {
		return new Promise((resolve, reject) => {
			if(!this.utility.isString(apiEndUrl)) {
				reject({
					message: "'apiEndUrl' must be string"
				});
			}
			if(!this.utility.isDefinedAndNotNull(payload)) {
				payload = {};
			}
			let url = apiEndUrl + (this.utility.getValue(options, 'params') ? this.buildParam(options.params) : '');
			let headers = new Headers();
			headers.append('Content-Type', 'application/json');
			headers.append('Accept', 'application/json');
			if(this.utility.getValue(options, 'headers')) {
				headers = this.buildHeader(headers, options.headers)
			}
			let jwt = this.utility.getFromLocalStorage('jwt_token');
			headers.append('Authorization', `Bearer ${jwt}`);
			let status = null;
			fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(payload)
			}).then(result => {
				status = (`${result.status}`[0] === '2') ? 'success' : 'error'
				if(this.history.location.pathname !== '/login' && result.status === 401) {
					this.history.push('/login')
				} else {
					return result.json();
				}
			}).then(resultData => {
				resolve({status: status, data: resultData});
			}).catch(error => {
				reject(error);
			});
		});
	}
}