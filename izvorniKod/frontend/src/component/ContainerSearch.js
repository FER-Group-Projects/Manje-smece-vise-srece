import React from 'react'
import GarbageMap from './MapComponent'
import { FaSearch } from 'react-icons/fa'

const ContainerSearch = () => {
    return(
        <div style={{display: 'contents'}}>
            <div class="input-group flex-nowrap"
                style={{zIndex: 2, marginLeft: '100px', width:'150px', position: 'absolute'}}>
                <input type="text" class="form-control" placeholder="ID" aria-label="Username" aria-describedby="addon-wrapping"/>
                <div onClick={() => {console.log('hello')}} class="input-group-append">
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