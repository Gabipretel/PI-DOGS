import React from 'react'
import {Link} from 'react-router-dom'
import styles from './styles/LandingPage.module.css'
function LandingPage() {
    return (
        <div className={styles.landingBackground}>
            <div className={styles.title}>Encuentra tu Mascota ideal
            <Link to='/home'>
                <button className={styles.btn}>Ingrese Aquí 🐶</button>
            </Link>
            </div>
        </div>
    )
}

export default LandingPage

