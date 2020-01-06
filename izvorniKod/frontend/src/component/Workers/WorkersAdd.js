import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdAdd } from 'react-icons/md'

const WorkersAdd = () => {
    const [workers,setWorkers] = useState([])
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        axios.get('/users/all').then((res) => {
            setWorkers([...res.data.map((user) => ({Username: user.username}))])
            setLoading(false)
        })
    },[])

    if(loading) return <div>...loading</div>

    return(
        <div style={{display:'flex', flexFlow:'row wrap',
                height:'fit-content', margin:'10px', marginTop:'0px'}}>
            {workers.map((value) => 
                    <div style={{
                        display:'flex', flexDirection:'column',
                        borderRadius:'15px', backgroundColor:'#FFFFFF',
                        margin:'10px', width:'200px',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                        }}>
                            <div style={{display:'flex', flexDirection:'column', margin:'10px', textAlign:'left'}}>
                                <span>Username: <span style={{textAlign:'right'}}>{value.Username}</span></span>
                            </div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:'5px'}}>
                            {/* <MdEdit style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}} 
                                onClick={() => history.push(`/kontejner/edit/${value.ID}`)}/> */}
                            <MdAdd style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                                onClick={() => console.log('obrisi me!!')}/>
                        </div>
                    </div>
                    )}
        </div>
    )
}

export default WorkersAdd