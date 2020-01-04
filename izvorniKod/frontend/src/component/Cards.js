import React from 'react'
import { useHistory } from 'react-router-dom'
import { MdDelete, MdEdit, MdAddCircleOutline } from 'react-icons/md'

const Cards = (props) => {
    let history = useHistory()

    return(
        <div style={{display:'flex', flexFlow:'row wrap',
                height:'fit-content', margin:'10px', marginTop:'0px'}}>
            {
                props.containers &&
                props.containers.map((value) => 
                    <div style={{
                        display:'flex', flexDirection:'column',
                        borderRadius:'15px', backgroundColor:'#FFFFFF',
                        height:'150px', margin:'10px',width:'300px',
                        justifyContent: 'center',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                        }}>
                        <div style={
                            {display:'flex', flexDirection:'row'}}
                            onClick={()=> history.push(`/kontejner/${value.ID}`)}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dumpster-non.JPG/220px-Dumpster-non.JPG" style={{width:'100px', height:'100px', margin:'10px'}}/>
                            <div style={{display:'flex', flexDirection:'column',
                             margin:'10px', textAlign:'left',
                             overflow:'hidden'
                             }}>
                                <span>ID: <span style={{textAlign:'right'}}>{value.ID}</span></span>
                                <span>Adresa: <span>{value.Adresa}</span></span>
                                <span>Ocjena: <span>{value.Ocjena}</span>/5</span>
                            </div>
                        </div>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <MdEdit style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                                onClick={() => history.push(`/kontejner/edit/${value.ID}`)}/>
                            <MdDelete style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                                onClick={() => console.log('obrisi me!!')}/>
                        </div>
                    </div>
                )
            }
            {
                props.zones &&
                props.zones.map((value) => 
                <div style={{
                    display:'flex', flexDirection:'column',
                    borderRadius:'15px', backgroundColor:'#FFFFFF',
                    margin:'10px', width:'150px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                    }}>
                        <div style={{display:'flex', flexDirection:'column', margin:'10px', textAlign:'left'}}>
                            <span>ID: <span style={{textAlign:'right'}}>{value.ID}</span></span>
                            <span>Ime: <span>{value.Ime}</span></span>
                        </div>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:'5px'}}>
                        {/* <MdEdit style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}} 
                            onClick={() => history.push(`/kontejner/edit/${value.ID}`)}/> */}
                        <MdDelete style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                            onClick={() => console.log('obrisi me!!')}/>
                    </div>
                </div>
                )
            }
            {
                props.workers &&
                props.workers.map((value) => 
                <div style={{
                    display:'flex', flexDirection:'column',
                    borderRadius:'15px', backgroundColor:'#FFFFFF',
                    margin:'10px', width:'200px',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                    }}>
                        <div style={{display:'flex', flexDirection:'column', margin:'10px', textAlign:'left'}}>
                            <span>Username: <span style={{textAlign:'right'}}>{value.Username}</span></span>
                        </div>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', marginBottom:'5px'}}>
                        {/* <MdEdit style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}} 
                            onClick={() => history.push(`/kontejner/edit/${value.ID}`)}/> */}
                        <MdDelete style={{backgroundColor:'white', borderRadius:'8px', height:'24px', width:'24px', borderRadius:'8px'}}
                            onClick={() => console.log('obrisi me!!')}/>
                    </div>
                </div>
                )
            }
            {
                props.containers &&
                <div style={{
                    display:'flex', flexDirection:'column',
                    borderRadius:'15px', backgroundColor:'#FFFFFF',
                    height:'150px', width:'300px', margin:'10px',
                    justifyContent:'center', alignItems:'center',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                    }}>
                        <MdAddCircleOutline onClick={()=> history.push('kontejner/dodaj/')}
                            style={{height:'50px', width:'50px'}}/>
                </div>
            }
            {
                props.zones &&
                <div style={{
                    display:'flex', flexDirection:'column',
                    borderRadius:'15px', backgroundColor:'#FFFFFF',
                    margin:'10px', width: '100px',
                    justifyContent:'center', alignItems:'center',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                    }}>
                    <MdAddCircleOutline onClick={()=> history.push('zone/dodaj')}
                        style={{height:'50px', width:'50px'}}/>
                </div>
            }
            {
                props.workers &&
                <div style={{
                    display:'flex', flexDirection:'column',
                    borderRadius:'15px', backgroundColor:'#FFFFFF',
                    margin:'10px', width: '200px',
                    justifyContent:'center', alignItems:'center',
                    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 1px 5px 0px'
                    }}>
                    <MdAddCircleOutline onClick={()=> history.push('sluzbenici/dodaj')}
                        style={{height:'50px', width:'50px'}}/>
                </div>
            }
        </div>
    )
}

export default Cards