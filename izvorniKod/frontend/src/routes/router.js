import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom"
import Loginform  from '.././forms/login-form'
import Signupform  from '.././forms/signup-form'
import MainWindow from '.././component/MainWindow'
import ContainerSearch from '../component/ContainerSearch'
import FavoriteContainers from '../component/FavoriteContainers'
import Zones from '../component/Zones/Zones'
import ZonesAdd from '../component/Zones/ZonesAdd'
import Workers from '../component/Workers/Workers'
import WorkersAdd from '../component/Workers/WorkersAdd'
import Containers from '../component/Container/Containers'
import MyZones from '../component/MyZones'
import MyRoutes from '../component/MyRoutes'
import Sidebar from '../component/Sidebar'
import Header from '../component/Header'
import ContainerInfo from '../component/Container/ContainerInfo'
import ContainerEdit from '../component/Container/ContainerEdit'
import ContainerAdd from '../component/Container/ContainerAdd'
import { AuthStore } from 'store/AuthStore'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('called')
        const username = localStorage.getItem('username') || ''
        let roles = localStorage.getItem('roles') || ['']
        AuthStore.setLoggedIn(username,roles)
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
                        <Route path="/sluzbenici/dodaj">
                            <WorkersAdd />
                        </Route>
                        <Route path="/sluzbenici">
                            <Workers />
                        </Route>
                        <Route path="/zone/dodaj">
                            <ZonesAdd />
                        </Route>
                        <Route path="/zone">
                            <Zones />
                        </Route>
                        <Route path="/kontejner/edit/:id">
                            <ContainerEdit />
                        </Route>
                        <Route path="/kontejner/dodaj">
                            <ContainerAdd />
                        </Route>
                        <Route path="/kontejner/:id">
                            <ContainerInfo />
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