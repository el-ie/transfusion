import React from 'react';
import logo from './logo.svg';
import './App.css';

import LoginForm from './components/LoginForm/LoginForm';

import TestAxios from './components/ENTRAINEMENT/TestAxios/TestAxios';

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
		          <Link to="/testaxios">test axios</Link>
		    	</li>
		      </ul>
			</nav>

			<div className="App">
			</div>

			<Routes>
			  <Route path="/" element={<TrainAxios/>} />
			  <Route path="/login" element={<LoginForm/>} />
			  <Route path="/homepage" element={<HomePage/>} />
			  <Route path="/testaxios" element={<TrainAxios/>} />
			</Routes>

			</>
		   );
}


export default App;
