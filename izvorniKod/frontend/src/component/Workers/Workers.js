import React, { useEfect, useState, useEffect } from 'react'
import Cards from '../Cards'
import axios from 'axios'

const Workers = () => {
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
        <Cards workers={workers}/>
    )
}

export default Workers