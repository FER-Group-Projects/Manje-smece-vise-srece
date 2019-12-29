import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { FaSave } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

const ContainerEdit = () => {
    const [loading, setLoading] = useState(true)
    const [container, setContainer] = useState({})
    const { id } = useParams()

    useEffect(() => {
        //get data
        //pretend data
        setTimeout(() => {
            setContainer({
                ID: id,
                adresa: "Bana Jelacica 55",
                ocjena: 3.4,
                img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dumpster-non.JPG/220px-Dumpster-non.JPG",
            })
            setLoading(false)
        },2000)
    },[])

    if(loading) return <div>loading...</div>

    return (
        <Formik
            initialValues={{
                ID: id,
                adresa: container.adresa,
                ocjena: container.ocjena,
                img: container.img}}
            onSubmit={(value) => console.log(value)}
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
                                    onClick={() => console.log('obrisi me!!')}/>
                            </div>
                        </div>
                    </div>
                </Form>
        </Formik>
    )
}

export default ContainerEdit