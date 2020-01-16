import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthStore } from '../store/AuthStore'
import './form.css'

const Loginform = observer(() => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()

    async function usernameChanged(event) {
        setUsername(event.target.value)
    }
    function passwordChanged(event) {
        setPassword(event.target.value)
    }

    async function login(event) {
        event.preventDefault()
        try {
            await axios({
                method: 'POST',
                url: '/login',
                data: {
                    "username" : `${username}`,
                    "password" : `${password}`
                }
            }).then((e) => {
                if(e.status==200){
                    console.log(e)
                    localStorage.setItem('username',username)
                    AuthStore.setLoggedIn(username,'')
                    AuthStore.setToken(e.headers.authorization)
                    history.push('/')

                    return axios({
                        method: 'GET',
                        url: '/users/current-user'
                    })
                }
            }).then((e) => {
                if(e.status==200){
                    AuthStore.setRoles(e.data.authorities)
                }
            })
        } catch (error) {
            console.log({error})
        }
    }

    useEffect(() => {
        if(AuthStore.getLoggedIn()!=='') history.push('/')
    },[])

    return (
        <div id="container">
            <h1 class="h3 mb-3 font-weight-normal">Prijava</h1>
            <form onSubmit={login} style={{display: 'flex', flexDirection: 'column' }} class='form-primary' >
                <label for='username' class='sr-only'>Korisničko ime</label>
                <input type='text' id='username' value={username} onChange={usernameChanged} required class='form-control' placeholder='Korisničko ime' />
                <label for='password' class='sr-only'>Lozinka</label>
                <input type='password' id='password' value={password} onChange={passwordChanged} required class='form-control' placeholder='Lozinka' />
                <div style={{display: 'flow', flexDirection: 'row'}}>
                    <input type='submit' value='Prijava' style={{width: '100px'}} class='btn btn-lg btn-primary btn-block' />
                    <Link to="/signup">Registracija</Link>
                </div>
            </form>
        </div>
    )
})

export default Loginform