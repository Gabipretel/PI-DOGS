import React ,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import {postDog, getTemperaments } from '../actions'
import {useDispatch,useSelector} from 'react-redux'
// importar getTemperaments crearla..
//postDogs//

function DogCreate() {
  // ESTO ESTA ROMPIENDO
const dispatch= useDispatch();
const history= useHistory();
const temperaments = useSelector((state)=> state.temperaments)
const [input, setInput] = useState({
    image:'',
    name: '',
    temperament:[],
    height_min:'',
    height_max:'',
    weight_min:'',
    weight_max:'',
    life_span:'',
})
useEffect(()=>{
    dispatch(getTemperaments())
},[dispatch])

function handleChange(e){
    setInput({
    ...input,
    [e.target.name]: e.target.value
    })
}

function handleSelect(e){
    setInput({
        ...input,
        temperament: [...input.temperament,e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(postDog(input))
    alert('Creado correctamente')
    setInput({
    image:'',
    name: '',
    temperament:[],
    height_min:'',
    height_max:'',
    weight_min:'',
    weight_max:'',
    life_span:'',
    })
    history.push('/home')
}

return (
    <div>
        <Link to='/home'><button>VOLVER</button></Link>
    AQUI SE VA A CREAR EL PERRO(RAZA)
        <h1>Crea tu raza de Perro</h1>
        <h3>Agregar IMG eso falta.</h3>
        <form onSubmit={handleSubmit}>
        <div>
            <label>Imagen:</label>
            <input
            type='url'
            value={input.image}
            name='image'
            onChange={handleChange}
            />
            </div>

            <div>
            <label>Nombre:</label>
            <input
            type='text'
            value={input.name}
            name='name'
            onChange={handleChange}
            />
            </div>

            <div>
            <label>Altura mínima:</label>
            <input
            type='number'
            value={input.height_min}
            name='height_min'
            onChange={handleChange}
            />

            </div>

            <div>
            <label>Altura máxima:</label>
            <input
            type='number'
            value={input.height_max}
            name='height_max'
            onChange={handleChange}
            />

            </div>

            <div>
            <label>Peso mínimo:</label>
            <input
            type='number'
            value={input.weight_min}
            name='weight_min'
            onChange={handleChange}
            />

            </div>

            <div>
            <label>Peso máximo:</label>
            <input
            type='number'
            value={input.weight_max}
            name='weight_max'
            onChange={handleChange}
            />

            </div>

            <div>
            <label>Años de vida:</label>
            <input
            type='number'
            value={input.life_span}
            name='life_span'
            onChange={handleChange}
            />
            </div>

            <div>
            <label>Temperamentos:{' '}</label>
            <select onChange={handleSelect}>
            {temperaments.map((temp) => {
                    return (
                    <option value={temp} key={temp}>
                    {temp}
                    </option>
                    );
                    })}
            </select>
            <ul><li>{input.temperament.map(elem=>elem +" ")}</li></ul>
            </div>

            <div>
            <button>Click aqui para crear</button>
            </div>
            
        </form>
    </div>
)
}

export default DogCreate
