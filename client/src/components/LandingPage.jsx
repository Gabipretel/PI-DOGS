import React from 'react'
import {Link} from 'react-router-dom'
import styles from './styles/LandingPage.module.css'
function LandingPage() {
    return (
        <div className={styles.landingBackground}>
            <div className={styles.title}>Find your ideal pets!
            <Link to='/home'>
                <button className={styles.btn}>Enter here 🐶</button>
            </Link>
            </div>
        </div>
    )
}

export default LandingPage

