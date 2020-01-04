import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Loginform from './forms/login-form'
import App from './routes/router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import {AuthStore} from "./store/AuthStore";

ReactDOM.render(<App />, document.getElementById('root'));

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token') || '';

    if (token !== undefined) {
        config.headers.Authorization = token;
        AuthStore.setToken(token)
    }

    return config;
});

serviceWorker.unregister();
