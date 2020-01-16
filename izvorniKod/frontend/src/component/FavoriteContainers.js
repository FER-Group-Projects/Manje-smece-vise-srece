import React, { Component } from 'react'
import GarbageMap from './MapComponent'
import axios from 'axios'

class FavoriteContainers extends Component {
  constructor() {
    super()
    this.state = { containers: [], favoriteContainers: [] }
  }

  componentDidMount() {
    axios.get('/waste-containers/all')
        .then((e) => {
            this.setState({containers: e.data.map((container) => 
                ({ID: container.id,lat: container.latitude, 
                lng: container.longitude, address: container.address}))})
            const username = localStorage.getItem('username') || ''
            const favoriteData = localStorage.getItem(`${username}favorite`) || ''
            const favoriteDataArray = favoriteData.split(' ')
            console.log('favoriteContainer:',favoriteDataArray)
            let favoriteContainers = []
            this.state.containers.map((container) => {
                if(favoriteDataArray.includes(`${container.ID}`)) favoriteContainers.push(container)
                console.log('omiljeni:',favoriteContainers)
            })
            this.setState({ favoriteContainers: favoriteContainers})
        }).catch(err => console.log(err))
  }

  render() {
    return (
        <GarbageMap isRedirect={true} containers={this.state.favoriteContainers} containerColor="green"/>
    )
  }
}

export default FavoriteContainers