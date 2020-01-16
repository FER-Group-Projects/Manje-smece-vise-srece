import React, { Component } from 'react'
import GarbageMap from './MapComponent'
import axios from 'axios'

class MainWindow extends Component {
  constructor() {
    super()
    this.state = { containers: [] }
  }

  componentDidMount() {
    axios.get('/waste-containers/all')
        .then((e) => {
          this.setState({containers: e.data.map((container) => 
            ({ID: container.id,lat: container.latitude, 
              lng: container.longitude, address: container.address}))})
        }).catch(err => console.log(err))
  }

  render() {
    return (
        <GarbageMap containers={this.state.containers} containerColor="black"/>
    )
  }
}

export default MainWindow