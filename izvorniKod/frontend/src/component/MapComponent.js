import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { useHistory } from 'react-router-dom'
import { FaDumpster, FaRegStar } from 'react-icons/fa'
import { observer } from 'mobx-react';


const Kontejner = (props) => {
return(
<div
    lat={props.lat}
    lng={props.lng}
    >
    <FaDumpster color={props.color}/>
    <div>
      {props.$hover && 
        <div style={{display:'flex', flexDirection: 'column',
          justifyContent:'center', alignItems:'center',
          backgroundColor: 'white', border:'1px solid grey',
          borderRadius:'15px', width:'100px'}}>
          <span>
            Broj kontejner: {props.ID}
          </span>
          <span>
            Adresa: {props.address}
          </span>
        </div>
      }
    </div>
  </div>
)
}
const GarbageMap = observer((props) => {
  const history = useHistory()
  const [containers, setContainers] = useState()
  const [loading, setLoading] = useState(true)
  const [center, setCenter] = useState()
  const [isAdding, setisAdding] = useState(false)
  const [isRedirect, setisRedirect] = useState(false)

  const defaultProps = {
    center: {
      lat: 45.8074124,
      lng: 15.974027299999989
    },
    zoom: 15,
    fillColor: 'black',
  };

  const _onClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event)
    // setContainers([...containers,{lat:lat, lng:lng}])
    // console.log(containers)
  }
  const _onChildClick = (key, childProps) => {
    console.log(key)
    setCenter(childProps)
  }
  const _onChildClickRedirect = (key, childProps) => {
    console.log(key)
    history.push(`/kontejner/${key}`)
  }
  let fillColor=defaultProps.fillColor
  let mpdimensions = {}

  useEffect(()=>{
    setContainers(props.containers)
    // setZones(props.zones)
    if(props.center) setCenter(props.center)
    if(props.isAdding) setisAdding(true)
    if(props.isRedirect) setisRedirect(true)
    setLoading(false)
  },[props])

  if(loading) return <div>...loading</div>
  return (
    <div style={{ zIndex: 1, height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCW0ohmI3x_qH-tT8Rr8JNl_uenFg0TsvY' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(true) ? _onClick : null}
        center={center}
        onChildClick={(isRedirect) ? _onChildClickRedirect : _onChildClick}
        onChange={({ center, zoom, marginBounds }) => {console.log(marginBounds)}}
      >
          { Array.isArray(containers) &&
              containers.map((container) => 
                  <Kontejner
                      key={container.ID}
                      ID={container.ID}
                      lat={container.lat}
                      lng={container.lng}
                      address={container.address}
                      color={props.containerColor}
                  />)
          }
      </GoogleMapReact>
    </div>
  )
})

export default GarbageMap