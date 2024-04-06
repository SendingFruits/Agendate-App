import Main from './src/views/home/Main';
import BaseError from './src/views/utils/BaseError';
import React, { useState } from 'react';

const App = () => {

	const [isConnected, setIsConnected] = useState(true);
	// const [navigation, setNavigation] = useState(null);
	// console.log(navigation);
	return (
		<>
			{isConnected ? <>
				<Main isConnected={isConnected} setIsConnected={setIsConnected} 
				// setNavigation={setNavigation} 
				/>
			</> : <>
				<BaseError errorType={'api'} setIsConnected={setIsConnected} 
				// navigation={navigation}
				/>
			</> }
		</>
	);
};

export default App;
