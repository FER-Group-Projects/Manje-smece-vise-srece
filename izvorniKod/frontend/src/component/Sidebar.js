import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '.././store/AuthStore'
import { observer } from 'mobx-react'
import { FaSearch } from 'react-icons/fa'

const SearchKontejnerButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><FaSearch/></button>
})

const LoginButton = observer(({ goToLogin }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={goToLogin}>Prijava</button>
})

const LogoutButton = observer(({ logout }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={logout}>Odjava</button>
})


const Sidebar = () => {
    let history = useHistory()

    const goToLogin = () => {
        history.push('/login')
    }

    const goToSerachKontejner = () => {
        history.push('/trazi-kontejner')
    }

    const logout = () => {
        AuthStore.setLoggedIn('')
        localStorage.removeItem('username')
        history.push('/')
    }

    useEffect(() => {
        const username = localStorage.getItem('username') || ''
        AuthStore.setLoggedIn(username)
    })
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '50px'}}>
            {AuthStore.getLoggedIn()=='' &&
            <LoginButton goToLogin={goToLogin}/>}
            {AuthStore.getLoggedIn()!=='' &&
            <LogoutButton logout={logout}/>}
            {AuthStore.getLoggedIn()!=='' &&
            <SearchKontejnerButton changePage={goToSerachKontejner}/>}
        </div>
    )
}

export default Sidebar