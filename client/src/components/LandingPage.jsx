import React from 'react'
import {Link} from 'react-router-dom'
import styles from './styles/LandingPage.module.css'
function LandingPage() {
    return (
        <div className={styles.landingBackground}>
            <h1>Encuentra tu Mascota ideal</h1>
            <Link to='/home'>
                <button>Ingrese Aquí 🐶</button>
            </Link>
        </div>
    )
}

export default LandingPage

