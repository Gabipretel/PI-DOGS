const { Router } = require('express');
//Instalo e importo axios//
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog,Temperament} = require('../db')
// const {API_KEY} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//FUNCIONES GLOBALES PARA TRAER INFO DE API Y DE DB PROPIA.//
 // FUNCION INFO API
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
 // FUNCION INFO DB PROPIA
const getDbInfo = async ()=>{
    return await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [], 
            }
        } 
    })
}

 //CONCATENO INFO API + DB //
const getAllDogs= async ()=>{
    const apiInfo= await getApiInfo();//traiga la info de la API
    const dbInfo= await getDbInfo(); // traiga la info de la DB
    const infoTotal= await apiInfo.concat(dbInfo) // concatena toda la info en un [].
    return infoTotal
}

// ruta  1 y 2 de get ALL/dogs. y get/dog por query ?name= //

router.get('/dogs', async (req,res)=>{
    const name = req.query.name
    let dogsTotal= await getAllDogs();
    if(name){
        let dogName= await dogsTotal.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())) 
        dogName.length ? //si existe, porque tiene algo-- entonces->
        res.status(200).send(dogName) : res.status(404).send('Not found or does not exist 😥') // trae un perro q buscas especificamente.
    }else{
        res.status(201).send(dogsTotal) //trae todos los perros
    }
})

//get temperaments traer de Api y guardar en la db propia..

// router.get('/temperaments', async (req,res)=>{
//     const temperamentsApi= await axios.get('https://api.thedogapi.com/v1/breeds')
//     const temperaments= temperamentsApi.data
//     const resultTemp = temperaments.map(el => el.temperament.split(", "))
//     // console.log(Temp)
//     resultTemp.forEach((temp)=>{
//         Temperament.findOrCreate({
//             where: {name: temp}
//         })
//     })
//     const allTemperaments= await Temperament.findAll()
//     res.send(allTemperaments);

// })

//get temperaments traer de Api y guardar en la db propia.. RUTA 5.
router.get("/temperaments", async (req, res) => {
    try {
    const allData = await axios.get(`https://api.thedogapi.com/v1/breeds`);    
    let everyTemperament = allData.data
        .map((dog) => (dog.temperament ? dog.temperament : "No info"))
        .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];  
    eachTemperament.forEach((el) => {
        if (el) {
        Temperament.findOrCreate({
            where: { name: el },
        });
        }
    });
        eachTemperament = await Temperament.findAll();
        // console.log(eachTemperament)
    res.status(200).json(eachTemperament);
    } catch (error) {
    res.status(404).send(error);
    }
});

//RUTA DE POST 5 DOG//
router.post('/dogs',async (req,res)=>{
    try { //llega info por formulario.//
        let {name,height_min,weight_min,height_max,weight_max,life_span,image,createdInDB,temperament} =req.body;

        const random = await axios.get("https://dog.ceo/api/breeds/image/random")
        const imageRandom= random.data.message
        const dogCreated= await Dog.create({
        name,
        height_min,
        weight_min,
        height_max,
        weight_max,
        life_span,
        image : image? image : imageRandom,
        createdInDB
        })
        let temperamentDb= await Temperament.findAll({ //AMIGABLE, FIEL, AMIGO DE TODOS,
            where: {name: temperament}
        })
        dogCreated.addTemperament(temperamentDb)
        res.send('Successfully Created!')
    } catch (error) {
        res.status(404).send(error)
    }
    
})

//RUTA  4 IDRAZA//

// router.get('/dogs/:id', async (req,res)=>{
//     const {id}= req.params;
//     const dogsTotal= await getAllDogs()
//         if(id){
//             let dogsId= await dogsTotal.filter(dog => dog.id == id)
//             dogsId.length?
//             res.status(200).json(dogsId):
//             res.status(404).send('Not found or does not exist 😥')
//         }
// })
router.get('/dogs/:id', async (req,res)=>{    // hoem/dome?id=7   url
    const {id}= req.params;
    const dogsTotal= await getAllDogs()
        if(id){
            let dogsId= await dogsTotal.filter(dog => dog.id == id)
            dogsId.length?
            res.status(200).json(dogsId):
            res.status(404).send('Not found or does not exist 😥')
        }
})

module.exports = router;
