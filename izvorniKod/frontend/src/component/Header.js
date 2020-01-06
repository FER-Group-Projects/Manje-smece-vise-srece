import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '.././store/AuthStore'

import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import { FaUserCircle, FaDumpsterFire } from 'react-icons/fa'

const Header = () => {
    let history = useHistory()

    const goToLogin = () => {
        history.push('/login')
    }

    const goToSignUp = () => {
        history.push('/signup')
    }

    const goToIndex = () => {
        history.push('/')
    }

    const goToSettings = () => {
        history.push('/settings')
    }

    const logout = () => {
        AuthStore.setLoggedIn('')
        localStorage.removeItem('username')
        localStorage.removeItem('roles')
        localStorage.removeItem('token')
        history.push('/')
    }

    useEffect(() => {
        const username = localStorage.getItem('username') || ''
        AuthStore.setLoggedIn(username)
    },[])

    let items

    if (AuthStore.getLoggedIn() !== '') {
        items = (
            <NavDropdown alignRight={true} title={<FaUserCircle/>}>
                <NavDropdown.Item onClick={goToSettings}>{AuthStore.getLoggedIn()}</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={goToSettings}>Postavke</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Odjava</NavDropdown.Item>
            </NavDropdown>
        )
    }
    else {
        items = (
            <NavDropdown alignRight={true} title={<FaUserCircle/>}>
                <NavDropdown.Item onClick={goToLogin}>Prijava</NavDropdown.Item>
                <NavDropdown.Item onClick={goToSignUp}>Registracija</NavDropdown.Item>
            </NavDropdown>
        )
    }

    return (
        <Navbar expand={false} bg="light" variant="light">
            <Navbar.Brand onClick={goToIndex}><FaDumpsterFire/> Manje smeće više sreće</Navbar.Brand>
            {items}
        </Navbar>
    )
}

export default Header
