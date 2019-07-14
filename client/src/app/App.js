import React from 'react';
import './App.css';
import Login from './components/login/login'
import Register from './components/register/register'

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Login/>
				{/* <Register/> */}
			</div>
		);
	}
}

export default App;
