import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { filterDogsbyTemperament, getDogs,filterCreated, orderByName } from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
import Pagination from './Pagination'

function Home() {
    const dispatch = useDispatch(); //reemplaza a la fn mapDispatchToProps.
    const allDogs= useSelector((state) => state.dogs) //reemplaza el mapStateToProps.
    //PAGINADO VARIOS ESTADOS LOCALES.
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const lastDog= currentPage * dogsPerPage //8
    const firstDog= lastDog - dogsPerPage //8-8 = 0
    const currentDogs= allDogs.slice(firstDog,lastDog) // indice 0 hasta el 5.
    //-----//
    const [orden, setOrden] = useState('')
    
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{    // Se ejecuta cuando el componente se monta y se actualiza si se le pasa alguna dependencia
        dispatch(getDogs())
    },[])

    const handleClick = (e)=>{        //VUELVE A CARGAR LOS PERROS.
        e.preventDefault()
        dispatch(getDogs())
    }
        //filtro por temperamentos
    // const handleFilterTemperament= (e)=>{
    //     dispatch(filterDogsbyTemperament(e.target.value))
    // }
     const handleFilterCreated= (e)=>{
        dispatch(filterCreated(e.target.value))
    }


    const handleSort=(e)=>{
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div>
            <Link to='/character'>Crea tu Mascota</Link>
            <h1>Mascota IT</h1>
            <button onClick={e =>{handleClick(e)}}>Volvé a cargar las mascotas</button>

            <div>
                <select onChange={e =>handleSort(e)}>
                    <option value="asc">Ascendente A-Z</option>
                    <option value="desc">Descendente Z-A</option>
                </select>
                
                <select onChange={e =>handleFilterCreated(e)}>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>

                {/* onChange={e =>handleFilterTemperament(e)} */}
                <select>
                    <option value='All'>Todos</option>
                    <option value='Brave'>Valiente</option>
                    <option value='Happy'>Feliz</option>
                    <option value='Friendly'>Amigable</option>
                    <option value='Loyal'>Lealtad</option>
                    <option value='Obedient'>Obediente</option>
                </select>

                <select>
                    <option value='breeds'>Razas</option>
                </select>
                
                <Pagination
                dogsPerPage={dogsPerPage} // Estado local
                allDogs={allDogs.length}  // useSelector -->state.dogs
                paginado={paginado} // function de paginacion
                />

                {
                    currentDogs && currentDogs.map((d)=>{
                        return(
                            <>
                            <Link to={`/home/${d.id}`}>
                            <Card
                            key={d.id}
                            name={d.name} 
                            image={d.image}
                            temperament={d.temperament} 
                            weight_min={d.weight_min}
                            weight_max={d.weight_max}
                            />
                            </Link>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home

