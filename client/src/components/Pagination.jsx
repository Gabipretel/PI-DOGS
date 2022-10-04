import React from 'react'
import styles from './styles/Pagination.module.css'
function Pagination({dogsPerPage,allDogs,paginado,currentPage}) {
    const pageNumbers = []

    for (let i= 0; i<=Math.ceil(allDogs/dogsPerPage)-1; i++){
        pageNumbers.push(i+1)
    } /// [1,2,3,4,5,6,7]

return (
    <div>
    <nav>
        <ul width='50px' height='50px'className={styles.pagination}>
            {pageNumbers && 
                pageNumbers.map(number =>(
                <button key={number}
                className={currentPage === number ? styles.pagination_active : styles.desactive}>
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
