import React from 'react'
import Cards from '../Cards'
import axios from "axios";

class Zones extends React.Component{
    constructor() {
        super()
        this.state = { zones: [] }
    }

    componentDidMount() {
        axios.get('/zones/all')
            .then((e) => {
                this.setState({zones: e.data.map((zone) => ({ID: zone.id, Ime: zone.zoneName}))})
            }).catch(err => console.log(err));
    }

    render() {
        return(
            <Cards zones={this.state.zones}/>
        )
    }
}

export default Zones