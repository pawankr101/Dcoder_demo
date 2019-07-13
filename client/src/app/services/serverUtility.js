import { UtilityService as utility } from "./utility";

class ServerUtilityService {
    localConst = { };

    buildParam(params) {
        let paramString = '';
        utility.forLoop(params, (param, key) => {
            if(utility.isString(param)) {
                paramString += `${key}=${param}`
            }
        });
        return paramString ? `?${paramString}` : '';
    }

    buildHeader(commonHeader, headers) {
        commonHeader = commonHeader || {};
        utility.forLoop(headers, (header, key) => {
            if(utility.isString(header)) {
                commonHeader[key] = header
            }
        });
        return commonHeader;
    }
    
    getRequest(apiEndUrl, options) {
        return new Promise((resolve, reject) => {
            if(!utility.isString(apiEndUrl)) {
                reject({
                    message: "'apiEndUrl' must be string"
                });
            }
            let url = apiEndUrl + this.buildParam(utility.getValue(options, 'params')),
                headers = {
                    'Content-Type': 'application/json'
                };
            headers = this.buildHeader(headers, utility.getValue(options, 'headers'))
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
            if(!utility.isString(apiEndUrl)) {
                reject({
                    message: "'apiEndUrl' must be string"
                });
            }
            if(!utility.isDefinedAndNotNull(payload)) {
                payload = {};
            }
            let url = apiEndUrl + this.buildParam(utility.getValue(options, 'params')),
                headers = {
                    'Content-Type': 'application/json'
                };
            headers = this.buildHeader(headers, utility.getValue(options, 'headers'))
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

export default {
    ServerUtilityService: new ServerUtilityService()
}