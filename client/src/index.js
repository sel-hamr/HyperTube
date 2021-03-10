import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import Axios from 'axios';
Axios.defaults.baseURL = 'http://localhost:1337';
// Axios.defaults.withCredentials = true
// Axios.defaults.credentials = 'same-origin'

ReactDOM.render(<App />, document.getElementById('root'));
