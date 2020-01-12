import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdAdd } from 'react-icons/md'

const WorkersAdd = () => {
    const [workers,setWorkers] = useState([])
    const [companyID, setCompanyID] = useState()
    const [direktor, setDirektor] = useState()
    const [loading,setLoading] = useState(true)

    function _addWorker(username){
        console.log(username)
        axios.get(`/users/${username}`).then((user)=>{
            axios.post(`${companyID}/add-employee/${user.ID}`)
        })
    }


    useEffect(() => {
        let dirID=null
        let comID=null
        let work=null
        let actualWorkers=[]
        axios.get('/users/current-user').then((res) => {
            console.log(res)
            setDirektor(res.data.username)
            dirID=res.data.username
            axios.get('/companies/all').then((res) => {
                res.data.map((company) => {
                    if(company.director.username==dirID) {
                        setCompanyID(company.id)
                        comID=company.id
                        axios.get(`/companies/${comID}/employees`).then((employees) => {
                            work=employees.data
                            axios.get('/users/all').then((users)=>{
                                const usernames = work.map((w) => w.username)
                                users.data.forEach((user) =>{
                                    if(!usernames.includes(user.username)){
                                        actualWorkers.push(user)
                                    }
                                })
                                setWorkers(actualWorkers)
                                console.log(actualWorkers)
                                setLoading(false)
                            })
                        })
                    }
                })
            })
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
                                <span>Username: <span style={{textAlign:'right'}}>{value.username}</span></span>
                            </div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:'5px'}}>
                            {/* <MdEdit style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}} 
                                onClick={() => history.push(`/kontejner/edit/${value.ID}`)}/> */}
                            <MdAdd style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                                onClick={() => _addWorker(value.username)}/>
                        </div>
                    </div>
                    )}
        </div>
    )
}

export default WorkersAdd