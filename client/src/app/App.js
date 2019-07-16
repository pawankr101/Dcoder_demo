import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/login/login'
import Register from './components/register/register';
import { UtilityService } from './services/utility';

function ThreadsHome (props) {
	return (
		<React.Fragment>
			<Route exact path="/threads" render={(props) => <h1>threads</h1>}/>
			<Route exact strict path="/threads/" render={() => <Redirect to="/threads"/>}/>
			<Route exact path="/threads/new" render={(props) => <h1>new threads</h1>}/>
			<Route exact strict path="/threads/new/" render={() => <Redirect to="/threads/new"/>}/>
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
