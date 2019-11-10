import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { observer } from 'mobx-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '../store/AuthStore'


const Myform = observer(() => {
    let history = useHistory()
    
    async function signup(event) {
        try {
            await axios({
                method: 'POST',
                url: '/users/sign-up',
                data: {
                    "username" : `${event.UserName}`,
                    "password" : `${event.Password}`,
                    "email": `${event.Email}`
                }
            }).then((e) => {
                if(e.status==200){
                    console.log("hellos")
                    history.push('/login')
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

    return(
        <Formik
            initialValues={{UserName: '', Email: '', Password: ''}}
            onSubmit={signup}
        >
            <Form>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <label >Korisničko ime:</label>
                    <Field name='UserName' type='text'/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <label >Email:</label>
                    <Field name='Email' type='text' />
                </div>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <label >Zaporka:</label>
                    <Field name='Password' type='password' />
                </div>
                <button type='submit'>Submit</button>
            </Form>

        </Formik>
    )
})

export default Myform