const { Router } = require('express');
//Instalo e importo axios//
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog,Temperament} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo= async () =>{
    const apiUrl= await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const apiInfo= await apiUrl.data.map(dog =>{
        return {
            id: dog.id,
            name: dog.name,
            image: dog.image.url,
            breed_group: dog.breed_group,
            temperament: dog.temperament,
            life_span: dog.life_span,
            weight_min: parseInt(dog.weight.metric.slice(0, 2).trim()),
            weight_max: parseInt(dog.weight.metric.slice(4).trim()),
            height_min: parseInt(dog.height.metric.slice(0, 2).trim()),
            height_max: parseInt(dog.height.metric.slice(4).trim()),
        }
    })
    return apiInfo
}

const getDbInfo = async ()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [], // comprobacion, mediante los atributos. 
            }
        } 
    })
}
const getAllDogs= async ()=>{
    const apiInfo= await getApiInfo();//traiga la info de la API
    const dbInfo= await getDbInfo(); // traiga la info de la DB
    const infoTotal= await apiInfo.concat(dbInfo) // concatena toda la info en un [].
    return infoTotal
}
// ruta de get dogs.

router.get('/dogs', async (req,res)=>{
    const name = req.query.name
    let dogsTotal= await getAllDogs();
    if(name){
        let dogName= await dogsTotal.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())) 
        dogName.length ? 
        res.status(200).send(dogName) : 
        res.status(404).send('No existe el perro') // trae un perro q buscas especificamente.
    }else{
        res.status(201).send(dogsTotal) //trae todos los perros
    }
})


// router.get('/pokemons', async (req,res)=>{
//     const name=req.query.name;
//     let pokemonsTotal=await getAllPokemons();
//     if(name){
//         let ponkemonName= await pokemonsTotal.filter(elem=>elem.name.toLowerCase().includes(name.toLowerCase()));
//         ponkemonName.length ?
//         res.status(200).send(ponkemonName):
//         res.status(404).send('No existe ese Pokemon')
//     }else{
//         res.status(200).send(pokemonsTotal)
//     }

// })






module.exports = router;
