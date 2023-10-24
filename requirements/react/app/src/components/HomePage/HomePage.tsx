import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function HomePage() {

	const [data, setData] = useState('');

	axios.get('http://localhost:3001/request/get_all', { withCredentials: true })
	.then( (response) => {
			//setUsername(JSON.stringify(response.data));
			//let tmp = JSON.stringify(response.data, null, 2);
			//console.log(tmp);

			setData(response.data);
			//console.log(response.data.email);
		})
	.catch( (error) => {
			console.log('erreur lors de la recuperation des donnees : ', error);
			} );

	return ( <div style={{textAlign: 'center'}}>
			<h1> Bienvenue sur transcendance </h1>
			<h2 style={{textAlign: 'left', position: 'relative', left: '300px', color: 'green'}}> Authentification reussie </h2>
			<br/><br/><br/>
			<div style={{ textAlign: 'left', position: 'relative', left: '300px' }}>
			<h1> Informations utilisateur :  </h1>
			<pre> <h1> [{JSON.stringify(data, null, 2)}] </h1> </pre>
			<pre> <h1> {} </h1> </pre>
			</div>

			</div> );
}
