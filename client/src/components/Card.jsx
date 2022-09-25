import React from 'react'
import styles from './styles/Card.module.css'
import { Link } from 'react-router-dom'
function Card({name,image,temperament,weight_min,weight_max,id}) {
    return (
        <div>   
            <div className={styles.card}>
                
                <div className={styles.face_front}>
                    <img src={image} alt='img not found' />
                    <h3>{name}</h3>
                </div>

                <div className={styles.face_back}>
                    <h3>{name}</h3>
                    <p>Temperaments{' '}{temperament}</p>
                    <p>Minimum weight{' '}{weight_min}Kg</p>
                    <p>Maximum weight{' '}{weight_max}Kg</p>
                    
                    
                    <div className={styles.link}>
                        <Link to={`/dogdetail/${id}`} 
                        style={{ textDecoration: 'none' ,  
                        color: '#f3f3f3'}}>
                        + Details
                        </Link> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card
