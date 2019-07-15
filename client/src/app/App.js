import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/login/login'
import Register from './components/register/register';

class App extends React.Component {
	render() {
		return (
			<div className="App">
				{/* <Route path="/one" render={() => <h3>One</h3>} /> */}
				<Route path="/login" component={Login}/>
				<Route path="/register" component={Register}/>
			</div>
		);
	}
}

export default App;
