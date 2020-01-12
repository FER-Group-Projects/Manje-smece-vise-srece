import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { FaSave } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { AuthStore } from 'store/AuthStore'
// import axios from 'axios'

const ContainerEdit = () => {
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const [container, setContainer] = useState({})
    const { id } = useParams()
    const axiosInstance = axios.create()

    const _saveContainer = async (values) => {
        await axiosInstance.get(`https://eu1.locationiq.com/v1/search.php?key=d3be9eb6cca657&q=${values.adresa}&format=json`)
            .then((res) => {
                if(res.status==200){
                    return axios('/waste-containers/' + id, {
                        method: 'PUT',
                        data: {
                            address: values.adresa,
                            latitude: res.data[0].lat,
                            longitude: res.data[0].lon
                        }
                    })
                }
            })
            .then((res) => {
                if (res.status == 200) {
                    history.push('/kontejneri')
                }
            })
    }

    const _deleteContainer = async () => {
        axios('/waste-containers/' + id, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.status == 200) {
                history.push('/kontejneri')
            }
        })
    }


    useEffect(() => {
        if(AuthStore.getLoggedIn()=='') history.push('/')
        axios('/waste-containers/' + id, {
            method: 'GET'
        }).then((res) => {
            if (res.status === 200) {
                setContainer({
                    ID: res.data.id,
                    adresa: res.data.address,
                    ocjena: res.data.grade.toFixed(1),
                    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dumpster-non.JPG/220px-Dumpster-non.JPG",
                })
                setLoading(false)
            }
        })
    },[])

    async function saveContainer(values) {
        await axiosInstance.get(`https://eu1.locationiq.com/v1/search.php?key=d3be9eb6cca657&q=${values.adresa}&format=json`)
            .then((res) => {
                if(res.status==200){
                    return axios('/waste-containers/' + id, {
                        method: 'PUT',
                        data: {
                            address: values.adresa,
                            latitude: res.data[0].lat,
                            longitude: res.data[0].lon
                        }
                    })
                }
            })
            .then((res) => {
                if (res.status == 200) {
                    history.push('/kontejneri')
                }
            })
    }

    async function deleteContainer() {
        axios('/waste-containers/' + id, {
            method: 'DELETE'
        })
        .then((res) => {
            if (res.status == 200) {
                history.push('/kontejneri')
            }
        })
    }

    if(loading) return <div>loading...</div>

    return (
        <Formik
            initialValues={{
                ID: id,
                adresa: container.adresa,
                ocjena: container.ocjena,
                img: container.img}}
            onSubmit={_saveContainer}
        >
                <Form>
                    <div style={{display: 'flex', flexFlow: 'row wrap', 
                    margin:'10px', marginTop:'0px'}}>
                        <img src={container.img} 
                            style={{height:'200px', width:'200px', marginRight:'10px'}}/>
                        <div style={{margin:'10px', marginLeft:'0px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', 
                                marginBottom:'10px', width:'260px'}}>
                                <div style={{backgroundColor:'darkgrey'}}>
                                    <label style={{margin:'0.5rem'}}>ID</label>
                                </div>
                                <Field name='ID' disabled type="text" placeholer={container.ID}
                                    style={{width:'100%'}}
                                />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', 
                                marginBottom:'10px', width:'260px'}}>
                                <div style={{backgroundColor:'darkgrey'}}>
                                    <label style={{margin:'0.5rem'}}>Adresa</label>
                                </div>
                                <Field name='adresa' type="text" placeholer={container.adresa}
                                    style={{width:'100%'}}
                                />
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', 
                                marginBottom:'10px', width:'260px'}}>
                                <div style={{backgroundColor:'darkgrey'}}>
                                    <label style={{margin:'0.5rem'}}>Ocjena</label>
                                </div>
                                <Field name='ocjena'  type="text" placeholer={container.ocjena}
                                    style={{width:'100%'}}
                                />
                            </div>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                                <button type="submit" style={{outline: 0,border: 0,background: 'none'}}>
                                    <FaSave style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}} />
                                </button>
                                <MdDelete style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                                    onClick={_deleteContainer}/>
                            </div>
                        </div>
                    </div>
                </Form>
        </Formik>
    )
}

export default ContainerEdit