import React from 'react'
import { Formik, Form, Field } from 'formik'


const Myform = () => (
    <Formik
        initialValues={{UserName: '', Email: '', Password: ''}}
        onSubmit={values => alert(JSON.stringify(values))}
    >
        <Form>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <label style={{width: '50%'}}>Korisničko ime:</label>
                <Field name='UserName' type='text' style={{width: '50%'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <label style={{width: '50%'}}>Email:</label>
                <Field name='Email' type='text' style={{width: '50%'}}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <label style={{width: '50%'}}>Zaporka:</label>
                <Field name='Password' type='password' style={{width: '50%'}}/>
            </div>
            <button type='submit'>Submit</button>
        </Form>

    </Formik>
)

export default Myform