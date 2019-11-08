import { observable } from 'mobx'

class store {
    loggedIn = observable({loggedIn: ''})

    setLoggedIn(username) {
        localStorage.setItem('username', username)
        this.loggedIn.loggedIn=username
    }
    getLoggedIn(){
        return this.loggedIn.loggedIn
    }
}

export const AuthStore = new store()