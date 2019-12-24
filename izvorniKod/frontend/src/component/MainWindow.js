import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Header from "./Header";

const MainWindow = () => {
    return (
        <div>
            <Header />
            <div style={{display: 'flex', flexDirection: 'column', width: '20%'}}>
                <Sidebar />
            </div>
        </div>
    )
}

export default MainWindow