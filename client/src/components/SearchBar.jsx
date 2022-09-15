import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {getNameDog} from '../actions/index'
import logoSearch from './img/search.png'
function SearchBar() {
const dispatch = useDispatch()
const [name, setName] = useState('')

function handleInputChange(e){ // tomar el valor del input
    e.preventDefault()
    setName(e.target.value)
    console.log(name)

}

function handleSubmit(e){     //despacha la accion y luego se ejecuta en el reducer el cambio en el estado
    e.preventDefault()
    dispatch(getNameDog(name))
    setName('')
}

    return (
        <div>
            <input
            value={name}
            type='text'
            placeholder='Buscar..'
            onChange={(e)=>handleInputChange(e)}
            />
            <button 
            type='submit' 
            onClick={(e)=>handleSubmit(e)}>
            <img src={logoSearch} width='40px' height='36px' alt='not found'/>
            </button>
        </div>
    )
}

export default SearchBar
