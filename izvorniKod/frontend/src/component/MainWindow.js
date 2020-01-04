import React, { Component } from 'react'
import GarbageMap from './MapComponent'
import axios from "axios";

class MainWindow extends Component {
  constructor() {
    super()
    this.state = { containers: [] }
  }

  componentDidMount() {
    axios.get('/waste-containers/all')
        .then((e) => {
          this.setState({containers: e.data.map((container) => ({lat: container.latitude, lng: container.longitude}))})
        }).catch(err => console.log(err));
  }

  render() {
    return (
        <GarbageMap containers={this.state.containers}/>
    )
  }
}

export default MainWindow