import React from 'react'
import styles from './styles/Card.module.css'
import { Link } from 'react-router-dom'
function Card({name,image,temperament,weight_min,weight_max,id}) {
    return (
        <div>   <div className={styles.img_conteiner}>
                <Link to={`/dogdetail/${id}`}>
                    <img className={styles.img_conteiner} src={image} alt='img not found' />
                </Link>
                </div>
                <div className={styles.text_conteiner}>
                    <h3>{name}</h3>
                    <div>Temperamento{' '}{temperament}</div>
                    <div>Peso máximo{' '}{weight_max}</div>
                    <div>Peso mínimo{' '}{weight_min}</div>  
                </div>
        </div>
    )
}
export default Card
