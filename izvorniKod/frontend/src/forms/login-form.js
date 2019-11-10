import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthStore } from '../store/AuthStore'

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
                    localStorage.setItem('username', 'username')
                    console.log("hellos")
                    AuthStore.setLoggedIn(username)
                    history.push('/')
                }
            })
        } catch (error) {
            console.log("hello")
        }
    }

    useEffect(() => {
        if(AuthStore.getLoggedIn()===''){
            const username = localStorage.getItem('username') || ''
            AuthStore.setLoggedIn(username)
        }
        if(AuthStore.getLoggedIn()!=='') history.push('/')
    })

    return (
        <form onSubmit={login} style={{display: 'flex', flexDirection: 'column'}} >
            <label>
                Username:
                <input type='text' value={username} onChange={usernameChanged}/>
            </label>
            <label>
                Password:
                <input type='password' value={password} onChange={passwordChanged}/>
            </label>
            <div style={{display: 'flow', flexDirection: 'row'}}>
                <input type='submit' value='submit' style={{width: '100px'}}/>
                <Link to="/signup">Signup</Link>
            </div>
        </form>
    )
})

export default Loginform