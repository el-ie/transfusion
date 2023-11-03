import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../LoginForm/LoginForm';

const RouteProtection = (props) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {

            try {
                const result = await axios.get('http://localhost:3001/auth/check_auth_token', { withCredentials: true });

				if (result.data === 'success')
					setIsAuthenticated(true);
				//else
				//	setIsAuthenticated(false);
				//useless ?
            } catch (error) {
				
                console.error("Error RouteProtection axios get ... auth/verification", error.response);
                setIsAuthenticated(false);
            }

    //        try {
    //            const result = await axios.get('http://localhost:3001/auth/check_2fa_activation', { withCredentials: true });
				//// ici la 2fa est active si on peut aller la
    //            const result = await axios.get('http://localhost:3001/auth/check_2fa_cookie', { withCredentials: true });
    //        } catch (error) {
    //        }

        };
    //            const result = await axios.get('http://localhost:3001/auth/check_auth_token', { withCredentials: true });
				//if (result.data === 'success')
				//	setIsAuthenticated(true);
				//else
				//	throw new Error('RouteProtection : Echec authentification classique');
				//
				//await axios.get('http://localhost:3001/auth/check_2fa_activation', { withCredentials: true });
				////si on arrive la la 2fa est activee sinon une erreur a ete throw du back
				//await axios.get('http://localhost:3001/auth/check_2fa_cookie', { withCredentials: true });

        checkAuthentication();

    }, []);

    if (isAuthenticated === null) {
        return <p>Vérification en cours...</p>;  // Affiche un message pendant la vérification
    }

	if (isAuthenticated)
		return props.children;

	else
	{
		return <Navigate to="/login" replace /> 
		//return (
		//	<div>
		//	<p> Pleas authenticate to go to the home page </p>
		//	<LoginForm/>
		//	</div>
		//);
	}
}

export default RouteProtection;
