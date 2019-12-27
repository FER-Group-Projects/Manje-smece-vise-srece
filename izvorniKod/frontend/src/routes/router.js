import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"
import Loginform  from '.././forms/login-form'
import Signupform  from '.././forms/signup-form'
import MainWindow from '.././component/MainWindow'
import ContainerSearch from '../component/ContainerSearch'
import FavoriteContainers from '../component/FavoriteContainers'
import Zones from '../component/Zones'
import Workers from '../component/Workers'
import Containers from '../component/Containers'
import MyZones from '../component/MyZones'
import MyRoutes from '../component/MyRoutes'
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
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
        <Router>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Header/>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <Sidebar/>
                    <Switch>
                        <Route path="/sluzbenici">
                            <Workers />
                        </Route>
                        <Route path="/zone">
                            <Zones />
                        </Route>
                        <Route path="/kontejneri">
                            <Containers />
                        </Route>
                        <Route path="/moje-rute">
                            <MyRoutes />
                        </Route>
                        <Route path="/moje-zone">
                            <MyZones />
                        </Route>
                        <Route path="/moji-kontejneri">
                            <FavoriteContainers />
                        </Route>
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
                </div>
            </div>
        </Router>
    );
}

export default App