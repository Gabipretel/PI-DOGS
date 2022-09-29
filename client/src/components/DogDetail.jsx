import React from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import { getDogDetails } from '../actions'
import styles from './styles/DogDetail.module.css'


function DogDetail(props) {
  const id= props.match.params.id
  console.log(props)
  const dispatch= useDispatch()

  useEffect(()=>{
    dispatch(getDogDetails(id))
  },[])

const dogdetails= useSelector((state)=> state.dogdetails)
  return (
    <div className={styles.font}>
          <Link to='/home' style={{textDecoration:'none'}}>
                <button  className={styles.btn}  >Volver</button>
            </Link>
      {
        dogdetails.length > 0 ? 
        <div className={styles.font}>
        <div className={styles.boxcard}>  
            
            <div className={styles.details}>
                <h1>{dogdetails[0].name}</h1>
                <img src={dogdetails[0].image} alt='no found' width='400px' height='300px'/>
                <h3>Temperaments{' '}{dogdetails[0].createdInDB ? dogdetails[0].temperaments.map(t=>t.name+ ' ') :dogdetails[0].temperament.split(',').join(' ')+ ' ' }</h3>
                <h3> Minimun height {' '} {dogdetails[0].height_min}cm</h3>
                <h3>Maximum height{' '} {dogdetails[0].height_max}cm</h3>
                <h3>Minimum weight{'  '} {dogdetails[0].weight_min}kg</h3>
                <h3>Maximum weight{' '} {dogdetails[0].weight_max}kg</h3>
                <h3>Life span{' '} {dogdetails[0].life_span}</h3>
            </div>  
        </div>
      
        </div> : <p>Loading... </p>
      }
        <div className={styles.backbtn}>
            
        </div>
    </div>
  )
}

export default DogDetail
