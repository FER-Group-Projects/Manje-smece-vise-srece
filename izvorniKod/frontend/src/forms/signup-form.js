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
                    history.push('/login')
                }
            })
        } catch (error) {
            console.log("hello")
        }
    }

    useEffect(() => {
        if(AuthStore.getLoggedIn()!=='') history.push('/')
    },[])

    return(
        <Formik
            initialValues={{UserName: '', Email: '', Password: ''}}
            onSubmit={signup}
        >
            <div id="container">
                <h1 class="h3 mb-3 font-weight-normal">Registracija</h1>

                <Form>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <label class='sr-only' >Korisničko ime:</label>
                        <Field name='UserName' type='text'class='form-control' placeholder='Korisničko ime' required />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <label class='sr-only' >Email:</label>
                        <Field name='Email' type='email' class='form-control' placeholder='Email' required />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <label class='sr-only' >Lozinka:</label>
                        <Field name='Password' type='password' class='form-control' placeholder='Lozinka' required />
                    </div>
                    <button type='submit' class='btn btn-lg btn-primary btn-block'>Registracija</button>
                </Form>

            </div>

        </Formik>
    )
})

export default Myform