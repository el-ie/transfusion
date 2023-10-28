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
                const result = await axios.get('http://localhost:3001/auth/verification', { withCredentials: true });
				console.log('=> axios.get ok   result [', result.data, ']');
				if (result.data === 'succes')
					setIsAuthenticated(true);
				else
					setIsAuthenticated(false);  // Optionnel : considère que l'utilisateur n'est pas authentifié en cas d'erreur
            } catch (error) {
				
                console.error("Erreur lors de la vérification de l'authentification", error);

                setIsAuthenticated(false);  // Optionnel : considère que l'utilisateur n'est pas authentifié en cas d'erreur
            }
        };

        checkAuthentication();

    }, []);  // Le tableau de dépendances vide signifie que cet effet ne sera exécuté qu'une fois, lorsque le composant est monté.

    if (isAuthenticated === null) {
        return <p>Vérification en cours...</p>;  // Affiche un message pendant la vérification
    }

	if (isAuthenticated)
	{
		console.log('RETURN is auth');
		return props.children;
	}
	else
	{
		console.log('RETURN not auth');
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
