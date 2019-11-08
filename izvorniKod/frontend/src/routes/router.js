import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom"
import Loginform  from '.././forms/login-form'
import Signupform  from '.././forms/signup-form'
import MainWindow from '.././component/MainWindow'

function App() {
return (
    <Router>
        <Switch>
            <Route path="/signup">
                <Signupform />
            </Route>
            <Route path="/login">
                <Loginform />
            </Route>
            <Route path="/">
                <MainWindow />
            </Route>
        </Switch>
    </Router>
);
}

export default App