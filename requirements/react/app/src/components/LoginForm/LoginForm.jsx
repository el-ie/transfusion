import React from "react";

import axios from 'axios';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: "",
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
	}

	handleInputChange(event) {
		if (event.target.name === "log_field")
			this.setState({ login: event.target.value });
		else
			this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		alert('login = ' + this.state.login + ' pass = ' + this.state.password);
		event.preventDefault();
	}

	async handleSignup() {
			//const response = await axios.get('http://localhost:3001');
			//console.log(response.data);
		window.location.href = 'http://localhost:3001/auth/login42';

	};

	render() {
		return (

			<>

			<br /><br /><br /><br /><br /><br /><br /><br />
			<div style={{ textAlign: 'center' }}>

			<form onSubmit={this.handleSubmit} style={{ display: 'inline-block' }}>
			<label>
			Login: <br/>
			<input type="text" name="log_field" value={this.state.login} onChange={this.handleInputChange} />
			</label>
			<br /><br />
			<label>
			Password: <br/>
			<input type="password" name="pass_field" value={this.state.password} onChange={this.handleInputChange} />
			</label>
			<br /><br />
			<input type="submit" value="Login" style={{ padding: '3px 25px', borderRadius: '4px',  display:'flex'}}/>
			</form>
			<button onClick={this.handleSignup} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-86px' }}>  Signup  </button>


			</div>

			</>

		);
	}
}
