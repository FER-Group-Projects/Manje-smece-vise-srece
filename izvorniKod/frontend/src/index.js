import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Loginform from './forms/login-form'
import App from './routes/router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
