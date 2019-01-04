import React from 'react';
import { Provider } from 'react-redux'
import Wrapper from './wrapper.js';
import store from '../store/request.js';


class App extends React.Component {

	render() {
		return (
			<Provider store={store} >
				<Wrapper />
			</Provider>
		)
	}
}


export default App;
