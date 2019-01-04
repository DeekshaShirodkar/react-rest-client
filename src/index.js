//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
//import './app/styles/bootstrap.min.css';
//import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import ReactDOM from 'react-dom';
import './app/styles/styles.css';
import App from './app/components/App';
import registerServiceWorker from './registerServiceWorker';



    ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
