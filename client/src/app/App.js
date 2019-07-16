import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import Login from './components/login/login'
import Register from './components/register/register';
import { UtilityService } from './services/utility';

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
				<Route exact strict path="/threads" render={(props) => <h1>threads</h1>}/>
				<Route exact strict path="/login" render={(props) => <Login {...props}/>}/>
				<Route exact strict path="/register" render={(props) => <Register {...props}/>}/>
			</div>
		);
	}
}

export default App;
