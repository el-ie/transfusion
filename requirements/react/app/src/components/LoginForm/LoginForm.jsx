import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserInfos from  '../UserInfos/UserInfos';

export default function LoginForm() {

	const [qrCode, setQrCode] = useState (null);

	const [twoFaSecret, setTwoFaSecret] = useState("");

	const [twoFaActivation, setTwoFaActivation] = useState(false);

	const [isSigned, setIsSigned] = useState(false);

	function handleSignup() {
		//let page = await axios.get('http://localhost:3001', { withCredentials: true });
		window.location.href = 'http://localhost:3001/auth/login42';
	};


    useEffect(() => {

        const checkIsSigned = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/check_is_signed', { withCredentials: true });
				setIsSigned(true);
            } catch (error) {
				console.log('', error.response);
            }
        };

        checkIsSigned();

        const getTwoFaActivationState = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/check_2fa_activation', { withCredentials: true });
				setTwoFaActivation(true);
            } catch (error) {
				console.log('', error.response);
            }
        };

		getTwoFaActivationState();

    });
    //}, []);

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
			setTwoFaActivation(true);
		} catch (error) {
			console.log('handleSubmit', error.response.data.message, error.response.data);
		}

	};

		//{twoFaActivation ? <h2 style={{ position: 'relative', left: '200px', top: '-150px' }}> 2FA status : < span style={{ color: 'green' }} > ACTIVATED </span>  </h2>  : <p> 2FA status : INACTIVE </p> }

	return (
		<div style={{ whiteSpace: 'pre' }} >

		<div style={{ textAlign: 'center' }}>


		<div style={{ position: 'absolute', right: '100px', top: '50px', border: '2px solid black', padding: '10px', borderRadius: '10px' }}>
		<h2> user status : </h2>
		{ isSigned ?
				<h2 style={{ color: 'green', display: 'inline-block' }} > SIGNED IN </h2> 
				: <h2 style={{ color: 'red', display: 'inline-block' }} > UNSIGNED </h2>
		}
		</div>

		<div style={{ position: 'absolute', right: '100px', top: '250px', border: '2px solid black', padding: '10px', borderRadius: '10px' }}>
		<h2> 2FA status : </h2>
		{ twoFaActivation ?
				<h2 style={{ color: 'green' }} > ACTIVATED </h2> 
				: <h2 style={{ color: 'red' }} > INACTIVE </h2>
		}
		</div>

		<br />

		<button onClick={handleSignup} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-86px' }}>  Signup  </button>



		{isSigned &&
		<button onClick={handleLaunchTwoFa} style={{ padding: '3px 20px', borderRadius: '4px', position:'relative', left:'-20px' }}> 2FA get QR-code  </button>
		}
		{ qrCode && 
			<div style={{ position:'relative', left: '0px', top: '50px' }}>
			<br />
			<h3> Veuillez entrer le code fournit par google authenticator </h3>
			<form onSubmit={handleSubmit}>
			<input type="text" value={twoFaSecret} onChange={handleChangeText} />
			<button type="submit">Soumettre</button>
			</form>
			<br />
			<img src={qrCode} />
			</div>
		}

		{isSigned &&
				<UserInfos />
		}

		</div>

		</div>
	);
}
//{qrCode? <img src={qrCode} /> : <p> 2FA inactive </p>}
