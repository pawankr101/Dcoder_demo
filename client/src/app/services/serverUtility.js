import { UtilityService } from "./utility";

export class ServerUtilityService {
	localConst = {};
	constructor() {
		this.utility = new UtilityService();
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
			fetch(url, {
				method: 'GET',
				headers: headers
			}).then(result => {
				return result.json();
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
			fetch(url, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(payload)
			}).then(result => {
				return result.json();
			}).then(resultData => {
				resolve(resultData);
			}).catch(error => {
				reject(error);
			});
		});
	}
}