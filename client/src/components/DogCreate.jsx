import React ,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import {postDog, getTemperamentsList } from '../actions'
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

    }else if(input.height_min < 15 || input.height_min > 45 ) { 
        errors.height_min= 'Se requiere una altura mínima entre 15cm a 45cm'

    }else if(input.height_max < 20 || input.height_max > 115  ) {
        errors.height_max= 'Se requiere una altura máximo entre 20 cm a 115cm '

    }else if(input.weight_min < 1 || input.weight_min > 50  ) {
        errors.weight_min= 'Se requiere un peso mínimo entre 1kg a 50kg '

    }else if(input.weight_max < 2 || input.weight_max > 110) {
        errors.weight_max= 'Se requiere un peso máximo a partir de los 2kg '
        
    }else if(input.life_span < 6  || input.life_span > 30 ) {
        errors.life_span= 'Se requiere un numero entre 6 a 30 años '
    }
    else if(input.temperament.length < 1  || input.temperament.length > 5 ) {
        errors.temperament= 'Se requiere al menos un temperamento y no mas de cinco'
    }
    return errors
}

function DogCreate() {
  // ESTO ESTA ROMPIENDO
const dispatch= useDispatch();
const history= useHistory();
//ORDENA DE la A a Z
const temperaments = useSelector((state)=> state.temperaments).sort()

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
    dispatch(getTemperamentsList())
},[])

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
    //Pregunta si existen los datos en el form
    if (
        input.image &&
        input.name  &&
        input.height_min &&
        input.height_max &&
        input.weight_min &&
        input.weight_max &&
        input.life_span &&
        input.temperament.length >0 && input.temperament.length <6
    )
    {
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
    } else{
        return alert("Algo salió mal 😥Complete  los datos correctamente para continuar")

    }
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
            min='15'
            max='45'
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
            min='20'
            max='115'
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
            min='1'
            max='50'
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
            min='2'
            max='110'
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
            min='6'
            max='30'
            onChange={handleChange}
            />
            {errors.life_span && <p className='error'>{errors.life_span}</p>}
            </div>

            <div>
            <label>Temperamentos:{' '}</label>
            <select onChange={handleSelect}>
            {temperaments.map((temp) => {
                    return (
                    <option value={temp} key={temp}>{temp}</option>
                    );})}
            </select>
            <ul>
                <li>{input.temperament.map(elem=>elem +" ")}</li>
            </ul>
            {errors.temperament && <p className='error'>{errors.temperament}</p>}
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
