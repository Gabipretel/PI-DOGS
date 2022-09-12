import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getDogs } from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
function Home() {
    const dispatch = useDispatch(); //reemplaza a la fn mapDispatchToProps.
    const allDogs= useSelector((state) => state.dogs) //reemplaza el mapStateToProps.

    useEffect(()=>{          // Se ejecuta cuando el componente se monta y se actualiza si se le pasa alguna dependencia
        dispatch(getDogs())
    },[])

    const handleClick = (e)=>{        //VUELVE A CARGAR LOS PERROS.
        e.preventDefault()
        dispatch(getDogs())
    }
    return (
        <div>
            <Link to='/character'>Crea tu Mascota</Link>
            <h1>Mascota IT</h1>
            <button onClick={e =>{handleClick(e)}}>Volvé a cargar las mascotas</button>

            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
                <select>
                    <option value='All'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>
                <select>
                    <option value='All'>Temperamento</option>
                    <option value='created'>Razas</option>
                </select>

                {
                    allDogs && allDogs.map((d)=>{
                        return(
                            <Card 
                            name={d.name} 
                            temperament={d.temperament} 
                            weight={d.weight} 
                            image={d.image}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home

