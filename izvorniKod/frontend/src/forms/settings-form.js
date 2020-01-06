import React, {useEffect, useState} from 'react'
import { Formik, Form, Field } from 'formik'
import { observer } from 'mobx-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { AuthStore } from '../store/AuthStore'


const SettingsForm = observer(() => {
    let history = useHistory()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    async function update(event) {
        try {
            await axios({
                method: 'PUT',
                url: '/users/' + AuthStore.getLoggedIn(),
                data: {
                    "username" : `${username}`,
                    "password" : `${password}`,
                    "email": `${email}`
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
        axios.get('/users/' + AuthStore.getLoggedIn())
            .then((e) => {
                if (e.status === 200) {
                    setEmail(e.data.email)
                    setUsername(e.data.username)
                    setPassword('')
                }
            });
    },[])

    return(
        <Formik
            initialValues={{UserName: '', Email: '', Password: ''}}
            onSubmit={update}
        >
            <div id="container">
                <h1 class="h3 mb-3 font-weight-normal">Osobni podaci</h1>

                <Form>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <label class='sr-only' >Korisničko ime:</label>
                        <Field name='UserName' type='text'class='form-control' placeholder='Korisničko ime' required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <label class='sr-only' >Email:</label>
                        <Field name='Email' type='email' class='form-control' placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <label class='sr-only' >Lozinka:</label>
                        <Field name='Password' type='password' class='form-control' placeholder='Lozinka' required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type='submit' class='btn btn-lg btn-primary btn-block'>Spremi</button>
                </Form>

            </div>

        </Formik>
    )
})

export default SettingsForm