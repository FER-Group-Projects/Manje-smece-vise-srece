import { observable } from 'mobx'
import axios from 'axios'

class store {
    loggedIn = observable({loggedIn: ''})
    token = observable({token: ''})
    roles = observable({roles: []})

    isEmployee() {
        console.log(this.getRoles())
        return this.getRoles().includes('EMPLOYEE')
    }

    isDirector() {
        return this.getRoles().includes('DIRECTOR')
    }

    isAdmin() {
        return this.getRoles().includes('DIRECTOR')
    }

    isDirectorOrAdmin() {
        return this.isDirector() || this.isAdmin()
    }

    setToken(token) {
        localStorage.setItem('token', token)
        this.token.token = token
    }

    getToken() {
        return this.token.token
    }

    setRoles(roles) {
        localStorage.setItem('roles', roles)
        this.roles.roles = roles
    }

    getRoles() {
        if (this.roles.roles === null || this.roles.roles.length == 0) {
            this.roles.roles = localStorage.getItem('roles') || []
        }

        return this.roles.roles
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
