import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import { FaSearch, FaStar, FaLaravel, FaDumpster, FaUser } from 'react-icons/fa'
import { IoIosGrid } from 'react-icons/io'
import { AuthStore } from '.././store/AuthStore'

const SearchKontejnerButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><FaSearch/></button>
})

const FavoriteKontejnerButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><FaStar/></button>
})

const MojeZoneButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><IoIosGrid/></button>
})

const MojeRuteButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><FaLaravel/></button>
})

const KontejneriButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><FaDumpster/></button>
})

const ZoneButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><IoIosGrid/></button>
})

const SluzbeniciButton = observer(({ changePage }) => {
    return <button class='btn btn-lg btn-primary btn-block' onClick={changePage}><FaUser/></button>
})

const Sidebar = () => {
    let history = useHistory()

    const goToSearchKontejner = () => {
        history.push('/trazi-kontejner')
    }
    const goToFavoriteKontejner = () => {
        history.push('/moji-kontejneri')
    }
    const goToMojeZone = () => {
        history.push('/moje-zone')
    }
    const goToMojeRute = () => {
        history.push('/moje-rute')
    }
    const goToKontejneri = () => {
        history.push('/kontejneri')
    }
    const goToZone = () => {
        history.push('/zone')
    }
    const goToSluzbenici = () => {
        history.push('/sluzbenici')
    }

    useEffect(() => {
        const username = localStorage.getItem('username') || ''
        AuthStore.setLoggedIn(username)
    })
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '50px'}}>
            <SearchKontejnerButton changePage={goToSearchKontejner}/>
            {AuthStore.getLoggedIn()!=='' &&
                <FavoriteKontejnerButton changePage={goToFavoriteKontejner}/>
            }
            {AuthStore.isEmployee() &&
                <MojeZoneButton changePage={goToMojeZone}/>
            }
            {AuthStore.isEmployee() &&
                <MojeRuteButton changePage={goToMojeRute}/>
            }
            {AuthStore.isDirectorOrAdmin() &&
                <KontejneriButton changePage={goToKontejneri}/>
            }
            {AuthStore.isDirectorOrAdmin() &&
                <ZoneButton changePage={goToZone}/>
            }
            {AuthStore.isDirectorOrAdmin() &&
                <SluzbeniciButton changePage={goToSluzbenici}/>
            }
        </div>
    )
}

export default Sidebar