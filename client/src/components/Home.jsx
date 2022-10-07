import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getDogs,filterCreated, orderByName,getTemperamentsList, orderByWeight,filterDogsByTemperament} from '../actions'
import {Link} from 'react-router-dom'
import Card from './Card'
import Pagination from './Pagination'
import SearchBar from './SearchBar'
import styles from './styles/Home.module.css'
import logo from './img/PiDog.png'


function Home() {
    const dispatch = useDispatch(); //reemplaza a la fn mapDispatchToProps.
    const allDogs= useSelector((state) => state.dogs) //reemplaza el mapStateToProps.
    
    //PAGINADO VARIOS ESTADOS LOCALES.
    const [currentPage, setCurrentPage] = useState(1)
    const dogsPerPage = 8
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
        // filtro por temperamentos
    const handleFilterTemperament= (e)=>{
        dispatch(filterDogsByTemperament(e.target.value))
        setCurrentPage(1);
        
    }
     const handleFilterCreated= (e)=>{
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
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

//FILTER ORDER BY PESO//
const handleOrderByWeight = (e)=>{
    dispatch(orderByWeight(e.target.value)) 
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
    //
}

    return (
        <div className={styles.homeBackground}>
        
            <h1 className={styles.titlepage}> Puppies App </h1>

            <div className={styles.boxbtns}>

            <Link to='/dog' className={styles.boxlink} style={{ textDecoration: 'none' ,color: 'black'}}>Create{' '}Dogs</Link>
            <img className={styles.imgLogo} src={logo} alt="not found" />
            <SearchBar paginado={paginado}/>  

            </div>
            <div className={styles.conteiner}>
            
                    <select className={styles.filters} defaultValue='title'onChange={e =>handleSort(e)}>
                        <option value="title" selected={selected} disabled>
                        Filter by ABC
                        </option>
                        <option value="asc">Ascendant A-Z</option>
                        <option value="desc">Descendent Z-A</option>
                    </select>

                    <select className={styles.filters} defaultValue='title' onChange={e =>handleFilterCreated(e)}>
                        <option value="title" selected={selected} disabled>
                        Filter by Origin
                        </option>
                        <option value='all'>All</option>
                        <option value='created'>Created </option>
                        <option value='api'>Existing</option>
                    </select>

                    <select  className={styles.filters} onChange={e =>handleFilterTemperament(e)}>         
                        <option value="all">
                        All temperaments
                        </option>
                        {temperaments.map((temp) => {
                        return (
                        <option value={temp} key={temp}>
                        {temp}
                        </option>
                        );
                    })}
                    </select>

                    <select className={styles.filters} defaultValue='title' onChange={e =>handleOrderByWeight(e)} >
                        <option value="title" selected={selected} disabled>
                        FilterbyWeight
                        </option>
                        <option value='heavy'>The Biggest</option>
                        <option value='weak'>The Little Ones</option>
                    </select>
                    <button className={styles.btn} onClick={e =>{handleClick(e)}}>Clean Filters</button>
            
            </div>
            <Pagination
                dogsPerPage={dogsPerPage} // Estado local
                allDogs={allDogs.length}  // useSelector -->state.dogs
                paginado={paginado} // function de paginacion
                currentPage={currentPage}
                />

            <div className={styles.basicgrid}>
                {
                    currentDogs && currentDogs.map((d)=>{
                        console.log(currentDogs)
                        return(
                            <>
                            <Card
                            id={d.id}
                            key={d.id}
                            name={d.name} 
                            image={d.image}
                            temperament={d.createdInDB ? d.temperaments.map(t=>t.name+ ', ') : d.temperament +' '} 
                            weight_min={d.weight_min}
                            weight_max={d.weight_max}
                            />
                            </>
                        )
                    })
                }
                </div>
        </div>
    )
}

export default Home

