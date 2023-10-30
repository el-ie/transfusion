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

				if (result.data === 'succes')
					setIsAuthenticated(true);
				else
					setIsAuthenticated(false);
            } catch (error) {
				
                console.error("Error RouteProtection axios get ... auth/verification", error.response);
                setIsAuthenticated(false);
            }
        };

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
