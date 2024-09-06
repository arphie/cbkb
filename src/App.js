import logo from './logo.svg';
import './App.css';
import kb from './sources/kb.json';

import React, { useEffect, useState } from "react";


function App() {

	const [SearchItem, setSearchItem] = useState('');
	const [SearchResults, setSearchResults] = useState([]);
	const [showError, setshowError] = useState(false);
	
	const handlekbSearch = () => {
		var kbsource = kb.source;

		/**
		 * convert search item to array
		 */
		var searchinfo = SearchItem.split(' ');

		/**
		 * locate items that has word on it
		 */
		var items = [];
		kbsource.map(function(object, index){
			/**
			 * if found in title
			 */
			if(searchinfo.some(term => object.title.includes(term))){ items.push(index); }

			/**
			 * if found in description
			 */
			if(searchinfo.some(term => object.description.includes(term))){ items.push(index);}
		});
		
		/**
		 * clean items
		 */
		const uniqueNames = Array.from(new Set(items));
		var kbresults = show_result_data(uniqueNames, kbsource, searchinfo);

		if(kbresults.length === 0){
			setshowError(true);
		} else {
			setshowError(false);
			setSearchResults(kbresults);
		}

	}

	function show_result_data(keys, source, searchkeys){
		var kbvalues = [];

		keys.map(function(object, index){
			var sourcefound = [];
			sourcefound['count'] = 0;
			sourcefound['results'] = source[object];
			

			var seachfound = source[object];
			
			// console.log("************"+seachfound.title);
			/**
			 * count hits
			 */
			searchkeys.map(function(sitem, skey){
				var stitle = seachfound.title.split(sitem).length - 1;
				var sdesc = seachfound.description.split(sitem).length - 1;

				sourcefound['count'] += stitle;
				sourcefound['count'] += sdesc;
				// console.log(sitem+" ~ title ~ "+stitle);
				// console.log(sitem+" ~ description ~ "+sdesc);
				// console.log('============================');
			});

			kbvalues.push(sourcefound);
		});

		kbvalues.sort((a, b) => (a.count < b.count) ? 1 : -1)

		console.log(kbvalues);

		return kbvalues;
	}


	return (
		<div className="App">
			<header className="App-header">
				<div className='d-search-image'><img src="/bookline.png" alt="image" /></div>
				<div className='d-search-now'>
					<input type="text" name="" id="" onChange={(e) => setSearchItem(e.target.value)} />
				</div>
				<div className='d-search-trigger'>
					<button onClick={handlekbSearch}>Search</button>
				</div>
				<div className='d-search-results'>
					{ showError ?
						<div className='d-no-search-result'>No result has been found</div>
					: 
						SearchResults.map((list, index) => (
							<div className='d-search-result' key={index}>
								<div className='d-result-title'>{list.results.title} <span>{list.count} ★</span></div>
								<div className='d-result-desc'>{list.results.description}</div>
							</div>
						))
					}
				</div>
			</header>
			
		</div>
	);
}

export default App;
