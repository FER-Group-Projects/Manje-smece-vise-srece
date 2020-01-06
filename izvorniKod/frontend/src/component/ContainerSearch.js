import React, { useEffect, useState } from 'react'
import GarbageMap from './MapComponent'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'

const ContainerSearch = () => {

    const [containers, setContainers] = useState([])
    const [loading, setLoading] = useState(true)
    const [containerID, setcontainerID] = useState()
    const [center, setCenter] = useState()

    const _searchContainer = () => {
      console.log(containers)
      if(containerID){
        containers.map((container) => {
          if(container.ID==containerID) setCenter({lat:container.lat, lng: container.lng})
        })
      }
    }
    const _handleChange = (event) => {
      setcontainerID(event.target.value)
    }

    useEffect(() => {
        axios.get('/waste-containers/all')
        .then((e) => {
          console.log(e)
          setContainers(e.data.map((container) => ({ID: container.id,lat: container.latitude, lng: container.longitude})))
        })
        setLoading(false)
    },[])

    if(loading) return <div>...loading</div>

    return(
      <div style={{display: 'contents'}}>
        <div class="input-group flex-nowrap"
          style={{zIndex: 2, marginLeft: '100px', width:'150px', position: 'absolute'}}>
          <input type="text" 
            class="form-control" placeholder="ID" 
            aria-label="Username" aria-describedby="addon-wrapping"
            onChange={_handleChange}
            />
          <div onClick={_searchContainer} class="input-group-append">
            <span class="input-group-text" id="addon-wrapping">
              <FaSearch/>
            </span>
          </div>
        </div>
        <GarbageMap containers={containers} isRedirect={true} center={center}/>
      </div>
    )
}

export default ContainerSearch