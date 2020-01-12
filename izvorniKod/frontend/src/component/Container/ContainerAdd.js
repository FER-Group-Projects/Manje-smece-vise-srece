import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { FaSave } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import axios from 'axios'
import { AuthStore } from 'store/AuthStore'

const ContainerEdit = () => {
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const axiosInstance = axios.create()

    useEffect(() => {
        if(!AuthStore.isDirectorOrAdmin()) history.push('/')
        setTimeout(() => {
            setLoading(false)
        },2000)
    },[])

    if(loading) return <div>loading...</div>

    return (
        <Formik
            initialValues={{
                ID: null,
                adresa: '',
                ocjena: '',
                img: ''}}
            onSubmit={async (value) => {
                await axiosInstance.get(`https://eu1.locationiq.com/v1/search.php?key=d3be9eb6cca657&q=${value.adresa}&format=json`)
                    .then(async (res) => {
                    if(res.status==200){
                        const {data} = res
                        console.log(typeof(data[0].lat))
                        const postData = {
                            latitude: parseFloat(data[0].lat),
                            longitude: parseFloat(data[0].lon),
                            address: value.adresa,
                        }
                        console.log('post-data:', postData)
                        const response = await axios.post('/waste-containers/create',postData)
                        console.log(response)
                    }
                    else{
                        console.log('wrong')
                    }
                })
                    .then((res) => {
                        if (res.status == 200) {
                            history.push('/kontejneri')
                        }
                    })
            }}
        >
                <Form>
                    <div style={{display: 'flex', flexFlow: 'row wrap', 
                    margin:'10px', marginTop:'0px'}}>
                        {/* treba dodati mogucnost prikaza slike dok je nema formik.values */}
                        <img src=''//treba staviti taj formik.values nutra 
                            style={{height:'200px', width:'200px', marginRight:'10px'}}/>
                        <div style={{margin:'10px', marginLeft:'0px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', 
                                marginBottom:'10px', width:'260px'}}>
                                <div style={{backgroundColor:'darkgrey'}}>
                                    <label style={{margin:'0.5rem'}}>Adresa</label>
                                </div>
                                <Field name='adresa' type="text" placeholer='Petrova 13, Zagreb...'
                                    style={{width:'100%'}}
                                />
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                                <button type="submit" style={{outline: 0,border: 0,background: 'none'}}>
                                    <FaSave style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}} />
                                </button>
                                <MdCancel style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                                    onClick={() => history.push('/kontejneri')}/>
                            </div>
                        </div>
                    </div>
                </Form>
        </Formik>
    )
}

export default ContainerEdit