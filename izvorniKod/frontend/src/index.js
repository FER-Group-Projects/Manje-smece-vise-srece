import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Loginform from './login-form'
import Myform from './signup-form'

ReactDOM.render(<Myform />, document.getElementById('root'));


serviceWorker.unregister();
