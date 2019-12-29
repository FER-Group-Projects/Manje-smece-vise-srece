import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import { FaDumpster } from 'react-icons/fa'

const Kontejner = ({}) => <FaDumpster/>;

export default class GarbageMap extends Component {
  static defaultProps = {
    center: {
      lat: 45.815399,
      lng: 15.966568
    },
    zoom: 11,
    fillColor: 'red',
    containers: [
      {lat: 45.815399, lng: 15.966568},
      {lat: 45.827399, lng: 15.968568},
      {lat: 45.839399, lng: 15.970568}
    ]
  };

  render() {
    let fillColor=this.props.fillColor
    return (
      <div style={{ zIndex: 1, height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCW0ohmI3x_qH-tT8Rr8JNl_uenFg0TsvY' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
            {
                this.props.containers.map((container) => 
                    <Kontejner
                        lat={container.lat}
                        lng={container.lng}
                    />)
            }
            <svg height="210" width="500" 
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
            </svg>
        </GoogleMapReact>
      </div>
    );
  }
}