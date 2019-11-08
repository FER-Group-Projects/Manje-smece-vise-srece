import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '.././store/AuthStore'
import { observer } from 'mobx-react'

const KonteinerButton = observer(() => {
    if(AuthStore.getLoggedIn()!=='') return <button>Kontejner</button>
    return null
})

const LoginButton = observer(({ goToLogin }) => {
    if(AuthStore.getLoggedIn()==='') return <button onClick={goToLogin}>Login</button>
    return null
})

const LogoutButton = observer(({ logout }) => {
    if(AuthStore.getLoggedIn()!=='') return <button onClick={logout}>Logout</button>
    return null
})


const MainWindow = () => {
    let history = useHistory()

    const goToLogin = () => {
        history.push('/login')
    }

    const logout = () => {
        AuthStore.setLoggedIn('')
        localStorage.setItem('username','')
        history.push('/')
    }

    useEffect(() => {
        if(AuthStore.getLoggedIn()===''){
            const username = localStorage.getItem('username') || ''
            AuthStore.setLoggedIn(username)
        }
    },[])

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '30%'}}>
            <LoginButton goToLogin={goToLogin}/>
            <LogoutButton logout={logout}/>
            <KonteinerButton />
        </div>
    )
}

export default MainWindow