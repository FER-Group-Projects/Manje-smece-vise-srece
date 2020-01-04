import { observable } from 'mobx'
import axios from 'axios'

class store {
    loggedIn = observable({loggedIn: ''})
    token = ''
    roles = []

    setToken(token) {
        this.token = token
        axios.defaults.headers.common['Authorization'] = token
    }

    getToken() {
        return this.token
    }

    setRoles(roles) {
        this.roles = roles
    }

    getRoles() {
        return this.roles
    }

    setLoggedIn(username) {
        localStorage.setItem('username', username)
        this.loggedIn.loggedIn=username
    }
    getLoggedIn(){
        return this.loggedIn.loggedIn
    }
}

export const AuthStore = new store()