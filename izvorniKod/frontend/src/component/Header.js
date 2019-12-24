import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '.././store/AuthStore'
import { observer } from 'mobx-react'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const KonteinerButton = observer(() => {
    if(AuthStore.getLoggedIn()!=='') return <button class='btn btn-lg btn-primary btn-block'>Kontejner</button>
    return null
})

const LoginButton = observer(({ goToLogin }) => {
    if(AuthStore.getLoggedIn()==='') return <button class='btn btn-lg btn-primary btn-block' onClick={goToLogin}>Prijava</button>
    return null
})

const LogoutButton = observer(({ logout }) => {
    if(AuthStore.getLoggedIn()!=='') return <button class='btn btn-lg btn-primary btn-block' onClick={logout}>Odjava</button>
    return null
})


const Header = () => {
    let history = useHistory()

    const goToLogin = () => {
        history.push('/login')
    }

    const goToIndex = () => {
        history.push('/')
    }

    const logout = () => {
        AuthStore.setLoggedIn('')
        localStorage.removeItem('username')
        history.push('/')
    }

    useEffect(() => {
        if(AuthStore.getLoggedIn()===''){
            const username = localStorage.getItem('username') || ''
            AuthStore.setLoggedIn(username)
        }
    },[])

    return (
        <Navbar expand={false} bg="light" variant="light">
            <Navbar.Brand onClick={goToIndex}><i className="fas fa-dumpster"></i> Manje smeće više sreće</Navbar.Brand>
            <NavDropdown alignRight={true} title={<i className="fas fa-user-circle fa-2x"></i>}>
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        </Navbar>
    )
}

export default Header