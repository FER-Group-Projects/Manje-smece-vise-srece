import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Loginform from './login-form'

ReactDOM.render(<Loginform />, document.getElementById('root'));


serviceWorker.unregister();
