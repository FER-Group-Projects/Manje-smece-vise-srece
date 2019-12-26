import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"
import Loginform  from '.././forms/login-form'
import Signupform  from '.././forms/signup-form'
import MainWindow from '.././component/MainWindow'
import ContainerSearch from '../component/ContainerSearch'
import Sidebar from '../component/Sidebar'
import { AuthStore } from 'store/AuthStore'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('called')
        const username = localStorage.getItem('username') || ''
        AuthStore.setLoggedIn(username)
        setLoading(false)
    },[])

    if(loading) return <div>Loading...</div>
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <Router>
                <Sidebar/>
                <Switch>
                    <Route path="/trazi-kontejner">
                        <ContainerSearch />
                    </Route>
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
        </div>
    );
}

export default App