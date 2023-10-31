import React, { useState } from "react";

import axios from 'axios';

//export default class LoginForm extends React.Component {
//	constructor(props) {
//		super(props);
//	}

export default function LoginForm() {

	const [qrCode, setQrCode] = useState (null);

	function handleSignup() {
		//let page = await axios.get('http://localhost:3001', { withCredentials: true });
		window.location.href = 'http://localhost:3001/auth/login42';
	};

	async function handleTwoFa() {

		try {
			const response = await axios.get('http://localhost:3001/auth/twofa_getqr', { withCredentials: true });
			setQrCode(response.data);
		} catch (error) {
			//pourquoi la requete s envoi en double en cas d erreur, visible dans le terminal web
			console.log('get qr code fail', error.response);
		}

	}

	//render(){} 
		return (
			<>
			<br /><br /><br /><br /><br /><br /><br /><br />
			<div style={{ textAlign: 'center' }}>

			<button onClick={handleSignup} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-86px' }}>  Signup  </button>

			<button onClick={handleTwoFa} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-20px' }}>  2FA  </button>

			<br /><br /><br /><br />

			{qrCode? <img src={qrCode} /> : <p> 2FA inactive </p>}

			</div>
			</>
		);

}
