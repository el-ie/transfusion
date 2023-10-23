
import React, { useState, useEffect } from 'react';

import axios from 'axios';

export default function TrainAxios() {

	const [username, setUsername] = useState('');
	
	axios.get('http://localhost:3001/request/test1')
	.then( (response) => {
			setUsername(response.data);
		})
	.catch( (error) => {
			console.log('erreur lors de la recuperation des donnees : ', error);
			}
			);


	return ( <div style={{textAlign: 'center'}}>
			<h1> Test axios </h1>
			<p> on recupere: [{username}] </p>
			</div> );
}
