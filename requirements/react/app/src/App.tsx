import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm/LoginForm';

import TestAxios from './components/ENTRAINEMENT/TestAxios/TestAxios';

import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage/Homepage';

function App() {


	return (
			<>

			<nav>
			  <ul>
		    	<li>
		          <Link to="/login">Login</Link>
		    	</li>
		      </ul>
			</nav>

			<div className="App">
			</div>

			<Routes>
			  <Route path="/login" element={<LoginForm/>} />
			  <Route path="/homepage" element={<HomePage/>} />
			</Routes>

			</>
		   );
}


export default App;
