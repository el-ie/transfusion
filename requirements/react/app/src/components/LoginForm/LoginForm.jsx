import React from "react";

import axios from 'axios';

export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSignup() {
		//let page = await axios.get('http://localhost:3001', { withCredentials: true });
		window.location.href = 'http://localhost:3001/auth/login42';
	};

	render() {
		return (
			<>
			<br /><br /><br /><br /><br /><br /><br /><br />
			<div style={{ textAlign: 'center' }}>

			<button onClick={this.handleSignup} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-86px' }}>  Signup  </button>

			</div>
			</>
		);
	}
}
