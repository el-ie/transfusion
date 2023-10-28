import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm/LoginForm';

import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';

import RouteProtection from './components/Routing/RouteProtection';

import Useless from './components/Useless/Useless';

function App() {


	return (
			<>

			<nav>
			  <ul>
		    	<li>
		          <Link to="/login">Login</Link>
		    	</li>
		    	<li>
		          <Link to="/homepage">homepage</Link>
		    	</li>
		      </ul>
			</nav>

			<div className="App">
			</div>

			<Routes>
			  <Route path="/useless" element={<Useless/>} />

			  <Route path="/" element={<LoginForm/>} />
			  <Route path="/login" element={<LoginForm/>} />
			  <Route path="/homepage" element={
				  <RouteProtection>
				  <HomePage/>
				  </RouteProtection>
			  } />
	
			</Routes>

			</>
		   );
}


export default App;
