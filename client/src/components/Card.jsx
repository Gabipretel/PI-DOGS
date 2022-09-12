import React from 'react'

function Card({name,image,temperament,weight_min,weight_max}) {
    return (
        <div>
            <h3>{name}</h3>
            <h4>{temperament}</h4>
            <div>Peso mínimo{' '}{weight_min}</div>  
            <div>Peso máximo{' '}{weight_max}</div>
            <img src={image} alt='img not found' width='300px' height='300px'/>
        </div>
    )
}
export default Card
