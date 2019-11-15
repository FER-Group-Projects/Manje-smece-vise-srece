import React, { useEffect } from 'react'
import Sidebar from './Sidebar'

const MainWindow = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '20%'}}>
            <Sidebar />
        </div>
    )
}

export default MainWindow