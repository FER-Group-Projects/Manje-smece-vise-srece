import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect,
  } from "react-router-dom"
import Loginform  from '.././forms/login-form'

function App() {
return (
    <Router>
        <Switch>
            <Route path="/pokemon_old">
            </Route>
            <Route path="/">
            <Loginform />
            </Route>
        </Switch>
    </Router>
);
}

export default App