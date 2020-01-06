import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { useHistory } from 'react-router-dom'
import { FaDumpster } from 'react-icons/fa'
import { observer } from 'mobx-react';


const Kontejner = (props) => 
<div
    lat={props.lat}
    lng={props.lng}
    >
    <FaDumpster/>
    {props.$hover && <div>{props.ID}</div>}
  </div>


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
    fillColor: 'red',
  };
  const _onClick = ({x, y, lat, lng, event}) => {
    console.log(x, y, lat, lng, event)
    setContainers([...containers,{lat:lat, lng:lng}])
    console.log(containers)
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

  useEffect(()=>{
    setContainers(props.containers)
    if(props.center) setCenter(props.center)
    if(props.isAdding) setisAdding(true)
    if(props.isRedirect) setisRedirect(true)
    setLoading(false)
  },[props])

  if(loading) return <div>...loading</div>
  return (
    <div style={{ zIndex: 1, height: '100vh', width: '100%' }}>
      {console.log('containers:',containers)}
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCW0ohmI3x_qH-tT8Rr8JNl_uenFg0TsvY' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(isAdding) ? _onClick : null}
        center={center}
        onChildClick={(isRedirect) ? _onChildClickRedirect : _onChildClick}
      >
          { Array.isArray(containers) &&
              containers.map((container) => 
                  <Kontejner
                      key={container.ID}
                      ID={container.ID}
                      lat={container.lat}
                      lng={container.lng}
                  />)
          }
          {/* <svg height="210" width="500" 
                  lat= {59.95}
                  lng= {30.33}
                  >
              <polygon
                points="200,10 250,190 160,210" 
                style={{
                  fillOpacity:'0', 
                  stroke: fillColor, 
                  strokeWidth:'1'
                  }} />
          </svg> */}
      </GoogleMapReact>
    </div>
  )
})

export default GarbageMap