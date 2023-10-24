import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm/LoginForm';

import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';

import TrainAxios from './components/TrainAxios/TrainAxios';

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
			  <Route path="/" element={<LoginForm/>} />
			  <Route path="/login" element={<LoginForm/>} />
			  <Route path="/homepage" element={<HomePage/>} />
			</Routes>

			</>
		   );
}


export default App;
