import React from 'react'
import Cards from '../Cards'
import axios from "axios";

class Containers extends React.Component {
    constructor() {
        super()
        this.state = { containers: [] }
    }

    componentDidMount() {
        this.loadContainers(this)
    }

    loadContainers(that) {
        axios.get('/waste-containers/all')
            .then((e) => {
                that.setState({containers: e.data.map((container) => ({ID: container.id, Adresa: container.address, Ocjena: container.grade.toFixed(1)}))})
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <Cards containers={this.state.containers} refreshContainers={() => this.loadContainers(this)}/>
        )
    }
}

export default Containers