import React, { useState } from 'react'

const Loginform = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function usernameChanged(event) {
        setUsername(event.target.value)
    }
    function passwordChanged(event) {
        setPassword(event.target.value)
    }

    function login(event) {
        alert('Ovo budem pocekal backend kaj vidim kak bude')
        event.preventDefault()
    }

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
            <input type='submit' value='submit' style={{width: '100px'}}/>
        </form>
    )
}

export default Loginform