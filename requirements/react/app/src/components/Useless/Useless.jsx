
import React , { useState } from "react";
import axios from 'axios';

export default function Useless() {

	const [Data, setData] = useState(null);

	async function handleClick() {
            try {
                const response = await axios.get('http://localhost:3001/auth/simple_test', { withCredentials: true });
				console.log(response.data);
				setData(response);
            } catch (error) {
				//pourquoi la requete s envoi en double en cas d erreur, visible dans le terminal web
				console.log('USELESS simple test : ', error.response);
            }
	}

	  return (
    <div>
		<h1> Welcome to the Useless page </h1>
		  <button onClick={handleClick}>buttonnnn</button>
		  <p>{JSON.stringify(Data, null, 2)}</p>
    </div>
  );
}
