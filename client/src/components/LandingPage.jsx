import React from 'react'
import {Link} from 'react-router-dom'
function LandingPage() {
    return (
        <div>
            <h1>Encuentra tu Mascota ideal</h1>
            <Link to='/home'>
                <button>Ingrese Aquí 🐶</button>
            </Link>
        </div>
    )
}

export default LandingPage

