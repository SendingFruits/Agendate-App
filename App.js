import { 
	CnnProvider
} from './src/context/CnnContext';

import Main from './src/views/home/Main';

const App = () => {

	return (
		<CnnProvider>
			<Main />
		</CnnProvider> 
	);
};

export default App;

