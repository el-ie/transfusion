import React, { useState } from "react";
import axios from 'axios';

export default function LoginForm() {

	const [qrCode, setQrCode] = useState (null);

	const [twoFaSecret, setTwoFaSecret] = useState("");

	function handleSignup() {
		//let page = await axios.get('http://localhost:3001', { withCredentials: true });
		window.location.href = 'http://localhost:3001/auth/login42';
	};

	async function handleLaunchTwoFa() {

		try {
			const response = await axios.get('http://localhost:3001/auth/2fa_getqr', { withCredentials: true });
			setQrCode(response.data);
		} catch (error) {
			//pourquoi la requete s envoi en double en cas d erreur, visible dans le terminal web
			console.log('get qr code fail', error.response);
		}

	}

	const handleChangeText = (event) => {
		setTwoFaSecret(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prévient le rechargement de la page lors de la soumission du formulaire

		try {
			const response = await axios.post('http://localhost:3001/auth/2fa_activate',{ twoFactorCode: twoFaSecret } ,{ withCredentials: true });
			//setQrCode(response.data);
		} catch (error) {
			console.log('handleSubmit', error.response.data.message, error.response.data);
		}

	};

	return (
		<>
		<br /><br /><br /><br /><br /><br /><br /><br />
		<div style={{ textAlign: 'center' }}>

		<button onClick={handleSignup} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-86px' }}>  Signup  </button>

		<button onClick={handleLaunchTwoFa} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-20px' }}> 2FA get QR-code  </button>

		{ qrCode? 
			<div style={{ position:'relative', left: '300px' }}>
			<br />
			<h3> Veuillez entrer le code google authenticator </h3>
			<form onSubmit={handleSubmit}>
			<input type="text" value={twoFaSecret} onChange={handleChangeText} />
			<button type="submit">Soumettre</button>
			</form>

			</div>

			: <p> </p> }

		<br /><br /><br /><br />

		{qrCode? <img src={qrCode} /> : <p> 2FA inactive </p>}

		</div>
		</>
	);
}
