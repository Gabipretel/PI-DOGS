import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import { getDogDetails } from '../actions'



function DogDetail(props) {
  const id= props.match.params.id
  console.log(props)
  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(getDogDetails(id))
  },[])

const dogdetails= useSelector((state)=> state.dogdetails)
  return (
    <div>
      {
        dogdetails.length > 0 ? 
        <div>
          <img src={dogdetails[0].image} alt='no found' width='400px' height='300px' />
          <h1>Raza{' '} {dogdetails[0].name}</h1>
          <h3>Temperamento{' '}{dogdetails[0].createdInDB ? dogdetails[0].temperaments.map(t=>t.name+ ' ') :dogdetails[0].temperament+ ' ' }</h3>
          <h3>Altura mínima {' '} {dogdetails[0].height_min}</h3>
          <h3>Altura máxima {' '} {dogdetails[0].height_max}</h3>
          <h3>Peso mínimo{' '} {dogdetails[0].weight_min}</h3>
          <h3>Peso máximo{' '} {dogdetails[0].weight_max}</h3>
          <h3>Años de vida{' '} {dogdetails[0].life_span}</h3>
        </div> : <p>Loading... </p>
      }
      <Link to='/home'>
        <button>Volver</button>
      </Link>
    </div>
  )
}

export default DogDetail
