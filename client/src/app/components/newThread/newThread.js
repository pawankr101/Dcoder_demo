import React from 'react';
import './newThread.css';
import { UtilityService } from '../../services/utility';
import { ServerUtilityService } from '../../services/serverUtility';
import { ErrorMsgUnderInputBox } from '../../stateless/errorComponents/errorComponents';
import { Link } from 'react-router-dom';
import { api_url } from '../../../config/config';

class NewThread extends React.Component {
    state = {
		error: false,
		errorMessage: null
	};
	thread = {
		title: null,
        description: null,
        tags: null
    };
    validationMessage = {
		title: '',
        description: '',
        tags: ''
    };
    constructor(props) {
		super(props)
		this.utility = new UtilityService();
        this.server = new ServerUtilityService();
        this.onSaveThread = this.onSaveThread.bind(this);
        this.logged_user = this.utility.getFromLocalStorage('logged_in_user');
    }

	saveThread() {
		const payload = {
            title: this.thread.title,
            description: this.thread.description,
            tags: [],
            creator: this.logged_user._id
        };
        let tagArr = this.thread.tags.split(',');
        this.utility.forLoop(tagArr, (val) => {
            val = val.trim();
            if(val.length) {
                payload.tags.push(val);
            }
        });
        this.server.postRequest(api_url.login, payload).then(res => {
            if(res.status === 'success') {
                this.props.history.push('/threads');
            } else {
                this.setState({
                    errorMessage: this.utility.getValue(res, 'data.message')
                });
            }
        }).catch(err => {
            console.log(err.message);
        });
	}

    hasError() {
		let error = false;
		this.setState({
			error: false,
			errorMessage: null
		});
		this.utility.forLoop(this.thread, (value, key) => {
			this.validateField(key);
			if (this.validationMessage[key]) {
				error = true;
			}
		});
		return error
    }

    onSaveThread() {
		let error = this.hasError();
		this.setState({
		  error: error
		});
		if(!error) {
			this.saveThread();
		}
	}
    
    validateField(field) {
		if (!this.thread[field]) {
			this.validationMessage[field] = `${field} required`;
			return true;
		}
        if (field === 'description' && this.thread.description.length > 200) {
          this.validationMessage.description = 'maximum length can be 200';
          return true;
        }
		this.validationMessage[field] = '';
		return false;
    }
    
    handleInputChange(field, event) {
		this.thread[field] = event.target.value;
		const error = this.validateField(field);
		this.setState({
		  error: error
		});
	}

    render() {
        return (
            <div className="NewThread">
                <div>
                    <div className="row w-100 m-0" style={{height:"60px"}}>
                        <div className="offset-1 col-10 border-bottom">
                            <div className="row h-100 w-100 m-0">
                                <div className="offset-1 col-10 align-self-end">
                                    <h2 className="m-0">New Thread</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 m-0" style={{height:"20px"}}></div>
					<div className="row w-100 m-0">
						<div className="offset-2 col-7">
							<form className="thread-form">
								<div className="form-element">
									<div className="form-group row form-input-box">
										<div className="offset-1 col-10">
											<label htmlFor="title" className="row">Title:</label>
											<div className="row">
												<input type="text" className="form-control" id="title" placeholder="Title"
													onChange={this.handleInputChange.bind(this, 'title')} />
											</div>
											<ErrorMsgUnderInputBox errorText={this.validationMessage.title} />
										</div>
									</div>
								</div>
								<div className="form-element">
									<div className="form-group row form-input-box">
										<div className="offset-1 col-10">
											<label htmlFor="description" className="row">Description:</label>
											<div className="row">
												<textarea className="form-control"  rows="3" id="description" placeholder="Description"
													onChange={this.handleInputChange.bind(this, 'description')}>
                                                </textarea>
											</div>
											<ErrorMsgUnderInputBox errorText={this.validationMessage.description} />
										</div>
									</div>
								</div>
                                <div className="form-element">
									<div className="form-group row form-input-box">
										<div className="offset-1 col-10">
											<label htmlFor="tags" className="row">Tags:</label>
											<div className="row">
												<input type="text" className="form-control" id="tags" placeholder="Tags"
													onChange={this.handleInputChange.bind(this, 'tags')} />
											</div>
											<ErrorMsgUnderInputBox errorText={this.validationMessage.tags} />
										</div>
									</div>
								</div>
								<div className="row w-100 m-0" style={{height:"15px"}}></div>
								<div className="form-group row w-100 m-0">
									<div className="offset-8 col-4">
										<Link className="btn btn-warning mr-4" to='/threads'>Cancel</Link>
										<button type="button" className="btn btn-success" onClick={this.onSaveThread}>Save</button>
									</div>
								</div>

								<div className="text-center" style={{height:"20px"}}></div>
								<div className="row w-100 m-0 justify-content-center text-center text-danger" style={{height:"40px"}}>
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
export default NewThread;