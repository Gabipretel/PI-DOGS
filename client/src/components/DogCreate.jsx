import React ,{useState,useEffect}from 'react'
import {Link,useHistory} from 'react-router-dom'
import {postDog, getTemperamentsList } from '../actions'
import {useDispatch,useSelector} from 'react-redux'
import styles from './styles/DogCreate.module.css'
// importar getTemperaments crearla..
//postDogs//

//FUNCION VALIDADORA DE FORMULARIO.
   //IMG  // /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
// PARA NAME // /^[a-zA-Z]{1,10}$/.test(name)
// Debo terminarlo...
function validateForm(input){
    let errors= {};
    if(!/^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(input.image)) {
        errors.image= 'A URL of type jpg,jpeg,webp,avif,gif,svg is required'

    }else if(!/((?=.*_)^[a-zA-Z_\s]{1,19}[a-zA-Z]$)|((?!.*_)^[a-zA-Z\s]{1,20}$)/.test(input.name)){ 
        errors.name= 'A name is required';

    }else if(input.height_min < 15 || input.height_min > 45 ) { 
        errors.height_min= 'A minimum height between 15cm to 45cm is required'

    }else if(input.height_max < 20 || input.height_max > 115  ) {
        errors.height_max= 'A maximum height between 20cm to 115cm is required'

    }else if(input.weight_min < 1 || input.weight_min > 50  ) {
        errors.weight_min= 'A minimum weight between 1kg to 50kg is required '

    }else if(input.weight_max < 2 || input.weight_max > 110) {
        errors.weight_max= 'A maximum weight is required from 2kg '
        
    }else if(input.life_span < 6  || input.life_span > 30 ) {
        errors.life_span= 'A number between 6 to 30 years is required'
    }
    else if(input.temperament.length < 1  || input.temperament.length > 5 ) {
        errors.temperament= 'At least one temperament is required and no more than five'
    }
    return errors
}

function DogCreate() {
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
        alert('Successfully Created')
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
        return alert("Something went wrong  😥Fill in the details correctly to continue")

    }
}

function handleDelete(del) {
    setInput({
    ...input,
    temperament: input.temperament.filter((temp) => temp !== del),
    });
}

return (
<div className={styles.form_conteiner}>
        <h1>Create your Dog 🐶</h1>

<div className={styles.boxform}>
    
    <form>

        <div className={styles.field}>
            
            <input
            type='url'
            value={input.image}
            name='image'
            placeholder='Enter a URL'
            onChange={handleChange}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
        </div>

        <div className={styles.field}>
            
            <input
            type='text'
            value={input.name}
            name='name'
            placeholder='Enter a Name '
            onChange={handleChange}
            />
            {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
         
            <input
            type='number'
            value={input.height_min}
            name='height_min'
            placeholder='Enter a Minimum height'
            min='15'
            max='45'
            onChange={handleChange}
            />
            {errors.height_min && <p className={styles.error}>{errors.height_min}</p>}
        </div>

        <div className={styles.field}>
            
            <input
            type='number'
            value={input.height_max}
            name='height_max'
            placeholder='Enter a Maximum height'
            min='20'
            max='115'
            onChange={handleChange}
            />
            {errors.height_max && <p className={styles.error}>{errors.height_max}</p>}
        </div>

        <div className={styles.field}>
           
            <input
            type='number'
            value={input.weight_min}
            name='weight_min'
            placeholder='Enter a Minimum weight'
            min='1'
            max='50'
            onChange={handleChange}
            />
            {errors.weight_min && <p className={styles.error}>{errors.weight_min}</p>}
        </div>

        <div className={styles.field}>
          
            <input
            type='number'
            value={input.weight_max}
            name='weight_max'
            placeholder='Enter a Maximum weight'
            min='2'
            max='110'
            onChange={handleChange}
            />
            {errors.weight_max && <p className={styles.error}>{errors.weight_max}</p>}
        </div>

        <div className={styles.field}>
       
            <input
            type='number'
            value={input.life_span}
            name='life_span'
            placeholder='Enter Life span'
            min='6'
            max='30'
            onChange={handleChange}
            />
            {errors.life_span && <p className={styles.error}>{errors.life_span}</p>}
        </div>

        <div className={styles.field}>
            <label>Temperaments{' '}</label>
            <select onChange={handleSelect}>
            {temperaments.map((temp) => {
                    return (
                    <option value={temp} key={temp}>{temp}</option>
                    );})}
            </select>
            {/* <ul>
                <li>{input.temperament.map(elem=>elem +" ")}</li>
            </ul> */}
            {errors.temperament && <p className={styles.error}>{errors.temperament}</p>}
        </div>
    </form>

    

</div>    
            {input.temperament.map(elem=>
            <div>
                <button className={styles.btndelete} onClick={()=>handleDelete(elem)}>Delete{' '}{elem}</button>
            </div>
            )}
        <div className={styles.btns}>
            <button className={styles.create} onClick={handleSubmit}>Create</button>
            <Link to='/home'><button>Back</button></Link>
        </div>
                
</div>
)
}

export default DogCreate
