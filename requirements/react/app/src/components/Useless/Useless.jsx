
import React , { useState } from "react";
import axios from 'axios';

export default function Useless() {

	const [data, setData] = useState(0);

	async function handleClick() {
            try {
                //const response = await axios.get('http://localhost:3001/auth/simple_get', { withCredentials: true });
                const response = await axios.get('http://localhost:3001/auth/check_2fa_cookie', { withCredentials: true });
				console.log(response.data);
				setData(response.data);
            } catch (error) {
				//pourquoi la requete s envoi en double en cas d erreur, visible dans le terminal web
				console.log('USELESS simple get : ', error.response);
            }
	}

	  return (
    <div>
		<h1> Welcome to the Useless page </h1>
		  <button onClick={handleClick}>buttonnnn</button>
    </div>
  );
}
