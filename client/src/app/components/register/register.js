import React from 'react';
import './register.css';
import { UtilityService } from '../../services/utility';
import { ServerUtilityService } from '../../services/serverUtility';
import { ErrorMsgUnderInputBox } from '../../stateless/errorComponents/errorComponents'
import { api_url } from '../../../config/config'

class Register extends React.Component {
	state = {
		error: false,
		errorMessage: null
	};

	register = {
        name: null,
		email: null,
        password: null,
        re_password: null,
        mobile: null
	};

	patterns = {
		email: /^\S+@\S+\.[\S]{2,4}$/,
		password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-_.])[A-Za-z\d#?!@$%^&*-_.]{8,}$/
	}

	validationMessage = {
        name: '',
		email: '',
        password: '',
        re_password: '',
        mobile: ''
	};

	constructor(props) {
		super(props)
		this.utility = new UtilityService();
		this.server = new ServerUtilityService();
		this.onRegister = this.onRegister.bind(this);
	}

	registerRequest() {
		this.utility.encryptPassword(this.register.password).then(password => {
			const payload = {
                name: this.register.name,
				email: this.register.email,
                password: password,
                mobile: this.register.mobile
			};
			this.server.postRequest(api_url.register, payload).then(res => {
				console.log(res);
				if(res.status === 'success') {

				} else {
					this.setState({
						errorMessage: this.utility.getValue(res, 'data.message')
					});
				}
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
			error: false,
			errorMessage: null
		});
		this.utility.forLoop(this.register, (value, key) => {
			this.validateField(key);
			if (this.validationMessage[key]) {
				error = true;
			}
		});
		return error
	}

	onRegister() {
		let error = this.hasError();
		this.setState({
		  error: error
		});
		if(!error) {
			this.registerRequest();
		}
	}

	validateField(field) {
		if (!this.register[field]) {
			this.validationMessage[field] = `${field} required`;
			return true;
		}
		if (field === 'email' && !this.patterns.email.test(this.register.email)) {
			this.validationMessage.email = 'invalid email';
			return true;
		}
		if (field === 'password' && !this.patterns.password.test(this.register.password)) {
			this.validationMessage.password = 'password must have small alphabet, capital alphabet digit and special char and minimum length should be 8';
			return true;
        }
        if (field === 're_password' && this.register.password !== this.register.re_password) {
            this.validationMessage.re_password = 're password is not matching to password';
			return true;
        }
        if (field === 'mobile' && (!(["9", "8", "7", "6"].includes(this.register.mobile[0])) || this.register.mobile.length !== 10)) {
          this.validationMessage.mobile = 'invalid number';
          return true;
        }
		this.validationMessage[field] = '';
		return false;
	}

	handleInputChange(field, event) {
        if (field === 'mobile' && !(/^[0-9]{0,10}$/.test(event.target.value))) {
            event.target.value = this.register[field] ? this.register[field] : '';
        }
		this.register[field] = event.target.value;
		const error = this.validateField(field);
		this.setState({
		  error: error
		});
	}

	render() {
		return (
			<div className="Register">
				<div>
					<div className="row">
						<div className="col-7 align-self-center">
							<h1 className="text-center text-white" style={{'fontSize': '55px','fontWeight': 'bold'}}>DCODER</h1>
						</div>
						<div className="col-4">
							<form className="register-form">
								<div className="form-element">
									<div className="form-group row form-input-box">
										<div className="offset-1 col-10">
											<label htmlFor="name" className="row">Name:</label>
											<div className="row">
												<input type="text" className="form-control" id="name" placeholder="Name"
													onChange={this.handleInputChange.bind(this, 'name')} />
											</div>
											<ErrorMsgUnderInputBox errorText={this.validationMessage.name} />
										</div>
									</div>
								</div>
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
								<div className="form-element">
									<div className="form-group row form-input-box">
										<div className="offset-1 col-10">
											<label htmlFor="re_password" className="row">Re Enter Password:</label>
											<div className="row">
												<input type="password" className="form-control" id="re_password" placeholder="Re Enter Password"
													onChange={this.handleInputChange.bind(this, 're_password')} />
											</div>
											<ErrorMsgUnderInputBox errorText={this.validationMessage.re_password} />
										</div>
									</div>
								</div>
								<div className="form-element">
									<div className="form-group row form-input-box">
										<div className="offset-1 col-10">
											<label htmlFor="mobile" className="row">Mobile:</label>
											<div className="row">
												<input type="text" className="form-control" id="mobile" placeholder="Mobile"
													onChange={this.handleInputChange.bind(this, 'mobile')} />
											</div>
											<ErrorMsgUnderInputBox errorText={this.validationMessage.mobile} />
										</div>
									</div>
								</div>
								<div className="form-group row">
									<div className="offset-7 col-4 ">
										<button type="button" className="btn btn-success" onClick={this.onRegister}>Register</button>
										{/* <Link className="btn btn-danger m-1" to='/'>Cancel</Link> */}
									</div>
								</div>
								
								<div className="row" style={{height:"20px"}}></div>
								<div className="row justify-content-center text-center text-danger" style={{height:"40px"}}>
									{this.state.errorMessage}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;
