import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import RouteProtection from '../Routing/RouteProtection';

import axios from 'axios';

export default function HomePage() {

	const [data, setData] = useState('');

    useEffect(() => {
        const getInformations = async () => {

            try {
                const response = await axios.get('http://localhost:3001/request/get_all', { withCredentials: true });

				setData(response.data);

            } catch (error) {

				//pourquoi la requete s envoi en double en cas d erreur, visible dans le terminal web
				console.log('Erreur dans l appel axios de get_all : ', error.response);
            }
        };

        getInformations();

    }, []);


	return ( 
		<RouteProtection>
		<div style={{textAlign: 'center'}}>
			<h1> Bienvenue sur transcendance </h1>
			<h2 style={{textAlign: 'left', position: 'relative', left: '300px', color: 'green'}}> Authentification reussie </h2>
			<br/><br/><br/>
			<div style={{ textAlign: 'left', position: 'relative', left: '300px' }}>
			<h1> Informations utilisateur :  </h1>
			<pre> <h1> [{JSON.stringify(data, null, 2)}] </h1> </pre>
			</div>
			</div>
		</RouteProtection>
	);
}
			//<pre> <h1> [{JSON.stringify(data, null, 2)}] </h1> </pre>
