import React ,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import {postDog, getTemperaments } from '../actions'
import {useDispatch,useSelector} from 'react-redux'
// importar getTemperaments crearla..
//postDogs//

//FUNCION VALIDADORA DE FORMULARIO.
   //IMG  // /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
// PARA NAME // /^[a-zA-Z]{1,10}$/.test(name)
// Debo terminarlo...
function validateForm(input){
    let errors= {};
    if(!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)) {
        errors.image= 'Se requiere una URL de tipo jpg,jpeg,webp,avif,gif,svg, Aviso: de no ser provista tendra una por defecto'

    }else if(!/((?=.*_)^[a-zA-Z_\s]{1,19}[a-zA-Z]$)|((?!.*_)^[a-zA-Z\s]{1,20}$)/.test(input.name)){ 
        errors.name= 'Se requiere un nombre';

    }else if(!/^[1-9][0-9]?$|^15$/.test(input.height_min)) { 
        errors.height_min= 'Se requiere una altura mínima de 15cm'

    }else if(!/^[1-9][0-9]?$|^115$/.test(input.height_max)) {
        errors.height_max= 'Se requiere una altura máximo'

    }else if(!/^[1-9][0-9]?$|^115$/.test(input.weight_min)) {
        errors.weight_min= 'Se requiere un peso mínimo'

    }else if(!input.weight_max) {
        errors.weight_max= 'Se requiere un peso máximo'
        
    }else if(!input.life_span) {
        errors.life_span= 'Se requiere un numero'
    }
    return errors
}



















function DogCreate() {
  // ESTO ESTA ROMPIENDO
const dispatch= useDispatch();
const history= useHistory();
const temperaments = useSelector((state)=> state.temperaments)
const [errors,setErrors] = useState({});

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
    setErrors(validateForm({
        ...input,
        [e.target.name]: e.target.value
    }))
    console.log(input)
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

function handleDelete(del) {
    setInput({
    ...input,
    temperament: input.temperament.filter((temp) => temp !== del),
    });
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
            placeholder='Escriba una URL'
            onChange={handleChange}
            />
            {errors.image && <p className='error'>{errors.image}</p>}
            </div>

            <div>
            <label>Nombre:</label>
            <input
            type='text'
            value={input.name}
            name='name'
            placeholder='Ingrese un nombre'
            onChange={handleChange}
            />
            {errors.name && <p className='error'>{errors.name}</p>}
            </div>

            <div>
            <label>Altura mínima:</label>
            <input
            type='number'
            value={input.height_min}
            name='height_min'
            placeholder='Ingrese una altura min'
            onChange={handleChange}
            />
            {errors.height_min && <p className='error'>{errors.height_min}</p>}
            </div>

            <div>
            <label>Altura máxima:</label>
            <input
            type='number'
            value={input.height_max}
            name='height_max'
            placeholder='Ingrese una altura max'
            onChange={handleChange}
            />
            {errors.height_max && <p className='error'>{errors.height_max}</p>}
            </div>

            <div>
            <label>Peso mínimo:</label>
            <input
            type='number'
            value={input.weight_min}
            name='weight_min'
            placeholder='Ingrese un peso min'
            onChange={handleChange}
            />
            {errors.weight_min && <p className='error'>{errors.weight_min}</p>}
            </div>

            <div>
            <label>Peso máximo:</label>
            <input
            type='number'
            value={input.weight_max}
            name='weight_max'
            placeholder='Ingrese un peso max'
            onChange={handleChange}
            />
            {errors.weight_max && <p className='error'>{errors.weight_max}</p>}
            </div>

            <div>
            <label>Años de vida:</label>
            <input
            type='number'
            value={input.life_span}
            name='life_span'
            placeholder='Ingrese años de vida'
            onChange={handleChange}
            />
            {errors.life_span && <p className='error'>{errors.life_span}</p>}
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
        {input.temperament.map(elem=>
            <div>
                <p>{elem}</p>
                <button onClick={()=>handleDelete(elem)}>X</button>
            </div>
    )}

    </div>
)
}

export default DogCreate
