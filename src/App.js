import logo from './logo.svg';
import './App.css';
import kb from './sources/kb.json';

import React, { useEffect, useState } from "react";


function App() {

	const [SearchItem, setSearchItem] = useState('');

	const handlekbSearch = () => {
		console.log('search kb');


	}


	return (
		<div className="App">
			<header className="App-header">
				<div className='d-search-now'>
					<input type="text" name="" id="" />
				</div>
				<div className='d-search-trigger'>
					<button onClick={handlekbSearch}>Search</button>
				</div>
			</header>
		</div>
	);
}

export default App;
