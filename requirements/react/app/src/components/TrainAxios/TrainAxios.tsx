
import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function TrainAxios() {

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
			<h1> Page de profile </h1>
			<br/><br/><br/>
			<div style={{textAlign: 'left', position: 'relative', left: '300px'}}>
			<h1> Informations utilisateur :  </h1>
			<pre> <h1> [{JSON.stringify(data, null, 2)}] </h1> </pre>
			<pre> <h1> {} </h1> </pre>
			</div>

			</div> );
}

	//async function testfetch() {
	//	const reponse = await fetch("http://localhost:3001/request/test_string");
	//	//const films = await reponse.json();
	//	//console.log(films);
	//	console.log(reponse);
	//}
	//testfetch();

	//async function testfetch() {
	//await fetch('http://localhost:3001/request/test_string', {
	//method: 'GET',
	//credentials: 'include',
	//})
	//.then((data: Response) => {
	//
	//		console.log(data.text)
	//		});
	//
	////const ensuite = await response.json();
	////console.log(ensuite);
	//}
	//testfetch();

///////////////// FONCTIONNEL ////////////////
//const [username, setUsername] = useState('');
//
//axios.get('http://localhost:3001/request/test_string', { withCredentials: true })
//.then( (response) => {
//		setUsername(response.data);
//		console.log(response.data);
//	})
//.catch( (error) => {
//		console.log('erreur lors de la recuperation des donnees : ', error);
//		}
//		);
