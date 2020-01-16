import React, { useState, useEffect } from 'react'
import Cards from '../Cards'
import axios from 'axios'

const Workers = () => {
    const [workers,setWorkers] = useState([])
    const [companyID, setCompanyID] = useState()
    const [direktor, setDirektor] = useState()
    const [loading,setLoading] = useState(true)


    useEffect(() => {
        let dirID=null
        let comID=null
        axios.get('/users/current-user').then((res) => {
            setDirektor(res.data.username)
            dirID=res.data.username
            axios.get('/companies/all').then((res) => {
                res.data.map((company) => {
                    if(company.director.username==dirID) {
                        setCompanyID(company.id)
                        comID=company.id
                        axios.get(`/companies/${comID}/employees`).then((employees) => {
                            setWorkers(employees.data)
                            setLoading(false)
                        })
                    }
                })
            })
        })
    },[])

    if(loading) return <div>...loading</div>

    return(
        <Cards workers={workers}/>
    )
}

export default Workers