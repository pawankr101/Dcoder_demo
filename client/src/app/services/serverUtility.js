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
		commonHeader = commonHeader || {};
		this.utility.forLoop(headers, (header, key) => {
			if(this.utility.isString(header)) {
				commonHeader[key] = header
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
			let url = apiEndUrl + this.buildParam(this.utility.getValue(options, 'params')),
				headers = {
					'Content-Type': 'application/json'
				};
			headers = this.buildHeader(headers, this.utility.getValue(options, 'headers'))
			let jwt = this.utility.getFromLocalStorage('jwt_token');
			headers['Authorization']= `Bearer ${jwt}`;
			fetch(url, {
				method: 'GET',
				headers: headers
			}).then(result => {
				if(this.history.location.pathname !== '/login' && result.status === 401) {
					this.history.push('/login')
				} else {
					return result.json();
				}
			}).then(resultData => {
				resolve(resultData);
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
			let url = apiEndUrl + this.buildParam(this.utility.getValue(options, 'params')),
				headers = {
					'Content-Type': 'application/json'
				};
			headers = this.buildHeader(headers, this.utility.getValue(options, 'headers'))
			let jwt = this.utility.getFromLocalStorage('jwt_token');
			headers['Authorization']= `Bearer ${jwt}`;
			fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(payload)
			}).then(result => {
				console.log(result);
				console.log(this.history);
				if(this.history.location.pathname !== '/login' && result.status === 401) {
					this.history.push('/login')
				} else {
					return result.json();
				}
				return result.json();
			}).then(resultData => {
				resolve(resultData);
			}).catch(error => {
				reject(error);
			});
		});
	}
}