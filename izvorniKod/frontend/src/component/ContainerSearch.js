import React, {useState} from 'react'
import GarbageMap from './MapComponent'
import { FaSearch } from 'react-icons/fa'
import {useHistory} from "react-router-dom";

const ContainerSearch = () => {
    const [ID, setID] = useState("")
    let history = useHistory()

    async function IDChanged(event) {
        setID(event.target.value)
    }

    function gotoContainer() {
        if (ID !== "") {
            history.push('/kontejner/' + ID)
        }
    }

    return (
        <div style={{display: 'contents'}}>
            <div class="input-group flex-nowrap"
                style={{zIndex: 2, marginLeft: '100px', width:'150px', position: 'absolute'}}>
                <input type="text" class="form-control" placeholder="ID" aria-label="Username" aria-describedby="addon-wrapping" onChange={IDChanged}/>
                <div onClick={gotoContainer} class="input-group-append">
                    <span class="input-group-text" id="addon-wrapping">
                        <FaSearch/>
                    </span>
                </div>
            </div>
            <GarbageMap/>
        </div>
    )
}

export default ContainerSearch