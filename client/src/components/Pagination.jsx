import React from 'react'

function Pagination({dogsPerPage,allDogs,paginado}) {
    const pageNumbers = []

    for (let i= 0; i<=Math.ceil(allDogs/dogsPerPage)-1; i++){
        pageNumbers.push(i+1)
    }

return (
    <div>
    <nav>
        <ul width='50px' height='50px'className='paginado'>
            {  pageNumbers && 
            pageNumbers.map(number =>(
                <button className='number' key={number}>
                <a onClick={()=> paginado(number)}>{number}</a>
                </button>
            ))
            }
        </ul>
    </nav>
    </div>
)
}

export default Pagination
