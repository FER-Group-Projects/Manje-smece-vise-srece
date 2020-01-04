import React from 'react'
import Cards from '../Cards'
import axios from "axios";

class Containers extends React.Component {
    constructor() {
        super()
        this.state = { containers: [] }
    }

    componentDidMount() {
        axios.get('/waste-containers/all')
        .then((e) => {
            this.setState({containers: e.data.map((container) => ({ID: container.id, Adresa: container.address}))})
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <Cards containers={this.state.containers}/>
        )
    }
}

export default Containers