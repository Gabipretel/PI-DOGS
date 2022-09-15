import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { filterDogsByTemperament,getDogs,filterCreated, orderByName,getTemperamentsList, orderByWeight} from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
import Pagination from './Pagination'
import SearchBar from './SearchBar'

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
    const [selected, setSelected]= useState(false)
    const paginado = (pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{    // Se ejecuta cuando el componente se monta y se actualiza si se le pasa alguna dependencia
        dispatch(getDogs());
        dispatch(getTemperamentsList());

    },[dispatch])

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

//sort ASC-DESC
    const handleSort=(e)=>{
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

// FILTER TEMPERAMENTS//
const temperaments = useSelector((state) => state.temperaments)
.sort(
    function (a, b) {
    if (a < b) return -1;
    else return 1;
    }
);

function handleFilteredByTemp(e) {
    e.preventDefault();
    dispatch(filterDogsByTemperament(e.target.value));
    
}
//FILTER ORDER BY PESO//
const handleOrderByWeight = (e)=>{
    dispatch(orderByWeight(e.target.value)) 
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
    //
}

    return (
        <div>
            <Link to='/character'>Crea tu Mascota</Link>
            <h1>Mascota IT</h1>
            <button onClick={e =>{handleClick(e)}}>Volvé a cargar las mascotas</button>

            <div>
                <select defaultValue='title'onChange={e =>handleSort(e)}>
                <option value="title" selected={selected} disabled>
                    Filtrar por Abecedario
                  </option>
                    <option value="asc">Ascendente A-Z</option>
                    <option value="desc">Descendente Z-A</option>
                </select>
                
                <select defaultValue='title' onChange={e =>handleFilterCreated(e)}>
                    <option value="title" selected={selected} disabled>
                    Filtrar por Origen
                  </option>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>

                {/* onChange={e =>handleFilterTemperament(e)}  falta arreglar.*/} 
                <select defaultValue='title' onChange={(e) => handleFilteredByTemp(e)}>
                <option value="title" selected={selected} disabled>
                    Filtrar por Temp
                </option>
                    {temperaments.map((temp) => {
                    return (
                    <option value={temp} key={temp}>
                    {temp}
                    </option>
                    );
                    })}
                </select>

                <select defaultValue='title' onChange={e =>handleOrderByWeight(e)} >
                <option value="title" selected={selected} disabled>
                    Filtrar por Peso
                </option>
                    <option value='heavy'>Lo más Grandotes</option>
                    <option value='weak'>Lo más Chicos</option>
                </select>
                
                <Pagination
                dogsPerPage={dogsPerPage} // Estado local
                allDogs={allDogs.length}  // useSelector -->state.dogs
                paginado={paginado} // function de paginacion
                />
                
                <SearchBar/>   

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

