export class UtilityService {

 	localConst = {};
 	extractValue(model, keyArr) {
 		return keyArr.reduce((pre, cur) => {
 			return (pre && this.isDefined(pre[cur])) ? pre[cur] : null;
 		}, model);
 	}

 	isDefined(model) {
 		return (typeof(model) !== 'undefined');
 	}
 	isUndefined(model) {
 		return (typeof(model) === 'undefined');
 	}
 	isDefinedAndNotNull(model) {
 		return this.isDefined(model) && (model !== null);
 	}
 	isString(model) {
 		return (typeof(model) === 'string');
 	}
 	isBoolean(model) {
 		return (typeof(model) === 'boolean');
 	}
 	isNumber(model) {
 		return (typeof(model) === 'number');
 	}
 	isArray(model) {
 		return (model instanceof Array);
 	}
 	isArrayOf(type, model) {
 		if (this.isString(type) && this.isArray(model)) {
 			return model.every(item => typeof(item) === type);
 		}
 		return false;
	}
	 
	getCookie(cookie_name) {
		if (!this.isString(cookie_name)) { return ''; }
		if (cookie_name.length && document.cookie.length) {
			let c_start = document.cookie.indexOf(cookie_name + '=');
			if (c_start > -1) {
				c_start = c_start + cookie_name.length + 1;
				let c_end = document.cookie.indexOf(';', c_start);
				c_end = c_end === -1 ? document.cookie.length : c_end;
				return document.cookie.substring(c_start, c_end);
			}
			return '';
		}
		return '';
	}

	getFromLocalStorage(key) {
		const item = localStorage.getItem(key);
		return JSON.parse(item);
	}
	saveToLocalStorage(key, value) {
		const valueString = JSON.stringify(value);
		localStorage.setItem(key, valueString);
	}
	deleteFromLocalStorage(key) {
		localStorage.removeItem(key);
	}

 	getValue(model, key, default_value) {
 		default_value = this.isDefined(default_value) ? default_value : null;
 		if (this.isDefinedAndNotNull(model) && this.isDefinedAndNotNull(key)) {
 			if (this.isString(key) && key.includes('.')) {
 				const val = this.extractValue(model, key.trim().split('.'));
 				return this.isDefinedAndNotNull(val) ? val : default_value;
 			}
 			return this.isDefinedAndNotNull(model[key]) ? model[key] : default_value;
 		}
 		return default_value;
 	}

 	forLoop(model, callback) {
 		let callback_return;
 		if (model instanceof Array) {
 			for (let index = 0, len = model.length; index < len; index++) {
 				callback_return = callback(model[index], index);
 				if (callback_return) {
 					if (callback_return === '__CONTINUE_LOOP') {
 						continue;
 					} else if (callback_return === '__BREAK_LOOP') {
 						break;
 					}
 				}
 			}
 		} else if (model) {
 			const keys = Object.keys(model);
 			for (let index = 0, len = keys.length; index < len; index++) {
 				const key = keys[index];
 				callback_return = callback(model[key], key);
 				if (callback_return) {
 					if (callback_return === '__CONTINUE_LOOP') {
 						continue;
 					} else if (callback_return === '__BREAK_LOOP') {
 						break;
 					}
 				}
 			}
 		}
 	}
}