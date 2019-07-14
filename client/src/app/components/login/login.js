import React from 'react';
import './login.css';
import { UtilityService } from '../../services/utility';
import { ServerUtilityService } from '../../services/serverUtility';
import { ErrorMsgUnderInputBox } from '../../stateless/errorComponents/errorComponents'
import { api_url } from '../../../config/config'

class Login extends React.Component {
	state = {
		error: false
	};

	login = {
		email: null,
		password: null,
	};

	patterns = {
		email: /^\S+@\S+\.[\S]{2,4}$/
	}

	validationMessage = {
	  email: '',
	  password: ''
	};

	constructor(props) {
		super(props)
		this.utility = new UtilityService();
		this.server = new ServerUtilityService();
		this.onLogin = this.onLogin.bind(this)
	}

	loginRequest() {
		this.utility.encryptPassword(this.login.password).then(password => {
			const payload = {
				email: this.login.email,
				password: password
			};
			this.server.postRequest(api_url.login, payload).then(res => {
				console.log(res);
				this.utility.saveToLocalStorage('jwt_token', this.utility.getValue(res, 'token'));
				delete res.token;
				this.utility.saveToLocalStorage('logged_in_user', res);
				// this.props.history.push('/');
			}).catch(err => {
				console.log(err.message);
			});
		}).catch(err => {
			console.log(err);
		});
	}

	hasError() {
		let error = false;
		this.setState({
			error: false
		});
		this.utility.forLoop(this.login, (value, key) => {
			this.validateField(key);
			if (this.validationMessage[key]) {
				error = true;
			}
		});
		return error
	}

	onLogin() {
		let error = this.hasError();
		this.setState({
		  error: error
		});
		if(!error) {
			this.loginRequest();
		}
	}

	validateField(field) {
		if (!this.login[field]) {
			this.validationMessage[field] = `${field} required`;
			return true;
		}
		if (field === 'email' && !this.patterns.email.test(this.login.email)) {
			this.validationMessage.email = 'invalid email';
			return true;
		}
		this.validationMessage[field] = '';
		return false;
	}

	handleInputChange(field, event) {
		this.login[field] = event.target.value;
		const error = this.validateField(field);
		this.setState({
		  error: error
		});
	}

	render() {
		return (
			<div className="Login">
				<div className="offset-2 col-10">LOGIN</div>
				<div className="login-form">
					<form>
						<div className="form-element">
							<div className="form-group row form-input-box">
								<div className="offset-1 col-10">
									<label htmlFor="email" className="row">Email:</label>
									<div className="row">
										<input type="email" className="form-control" id="email" placeholder="Email"
											onChange={this.handleInputChange.bind(this, 'email')} />
									</div>
									<ErrorMsgUnderInputBox errorText={this.validationMessage.email} />
								</div>
							</div>
						</div>
						<div className="form-element">
							<div className="form-group row form-input-box">
								<div className="offset-1 col-10">
									<label htmlFor="password" className="row">Password:</label>
									<div className="row">
										<input type="password" className="form-control" id="password" placeholder="Password"
											onChange={this.handleInputChange.bind(this, 'password')} />
									</div>
									<ErrorMsgUnderInputBox errorText={this.validationMessage.password} />
								</div>
							</div>
						</div>
						<div className="form-group row">
							<div className="offset-10 col-1 ">
								<button type="button" className="btn btn-success" onClick={this.onLogin}>Login</button>
								{/* <Link className="btn btn-danger m-1" to='/'>Cancel</Link> */}
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Login;
