import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '../store/AuthStore'


const Myform = observer(() => {
    let history = useHistory()
    
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
            onSubmit={values => alert(JSON.stringify(values))}
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