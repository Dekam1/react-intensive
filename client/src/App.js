import { Routes, Route } from 'react-router-dom';

import './styles/index.scss';

import Login from './pages/Login';
import Main from './pages/Main';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
		</Routes>
	);
}

export default App;
