import React from 'react';
import './App.css';
import logo from '../assets/images/logo.svg';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/login/login'
import Register from './components/register/register';
import Threads from './components/threads/threads'
import NewThread from './components/newThread/newThread'
import { UtilityService } from './services/utility';

function ThreadsHome (props) {
	let utility = new UtilityService();
	let logged_user = utility.getFromLocalStorage('logged_in_user');
	let logout = () => {
		utility.deleteFromLocalStorage('jwt_token');
		utility.deleteFromLocalStorage('logged_in_user');
		props.history.push('/login');
	};
	return (
		<React.Fragment>
			<div className="row w-100 m-0 bg-dark " style={{height:"70px"}}>
				<div className="col-3">
					<div className="row h-100 text-white">
						<div className="offset-1 col-2 p-0 align-self-center">
							<img src={logo} alt="logo" width="40" height="40"/>
						</div>
						<div className="col-9 p-0 align-self-center">
							<h1 className="m-0">DCODER</h1>
						</div>
					</div>
				</div>
				<div className="offset-5 col-4">
					<div className="row h-100">
						<div className=" offset-4 col-7 align-self-center text-white">
							<h5 className="m-0 d-inline-block text-capitalize" style={{'paddingTop':'3px'}}>{logged_user.name}</h5>
							<button type="button" className="btn btn-sm btn-danger ml-3" onClick={logout}>Logout</button>
						</div>
					</div>
				</div>
			</div>
			<div className="w-100 m-0 p-0" style={{height: 'calc(100vh - 70px)'}}> 
				<Route exact path="/threads" render={(props) => <Threads {...props}/>}/>
				<Route exact strict path="/threads/" render={() => <Redirect to="/threads"/>}/>
				<Route exact path="/threads/new" render={(props) => <NewThread {...props}/>}/>
				<Route exact strict path="/threads/new/" render={() => <Redirect to="/threads/new"/>}/>
			</div>
		</React.Fragment>
	);
}

class App extends React.Component {
	constructor() {
		super();
		this.utility = new UtilityService();
	}
	render() {
		return (
			<div className="App">
				<Route exact strict path="/" render={() => {
					const jwt = this.utility.getFromLocalStorage('jwt_token');
					if(jwt) {
						return <Redirect to="/threads"/>
					} else {
						return <Redirect to="/login"/>
					}
				}}/>
				<Route path="/threads" render={(props) => {
					const jwt = this.utility.getFromLocalStorage('jwt_token');
					if(jwt) {
						return <ThreadsHome {...props}/>
					} else {
						return <Redirect to="/login"/>
					}
				}}/>
				<Route exact path="/login" render={(props) => <Login {...props}/>}/>
				<Route exact strict path="/login/" render={() => <Redirect to="/login"/>}/>
				<Route exact path="/register" render={(props) => <Register {...props}/>}/>
				<Route exact strict path="/register/" render={() => <Redirect to="/register"/>}/>
			</div>
		);
	}
}

export default App;
