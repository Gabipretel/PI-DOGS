import axios from "axios";
import { 
    GET_DOGS,
    FILTER_CREATED,
    ORDER_BY_NAME,
    GET_TEMPERAMENTS_LIST,
    FILTER_BY_TEMPERAMENT,
    ORDER_BY_WEIGHT,
    GET_NAME_DOGS,
    GET_DOG_DETAIL
} from "./actions";




//Trae los perros
export function getDogs(){
    return async function(dispatch){
        let json= await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload:json.data
        })

    }
}
//FILTRA Por origen 
export function filterCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
}
//Filtra por Name. A-Z 
export function orderByName(payload){
    return{
        type:ORDER_BY_NAME,
        payload
    }
}

//FILTRO POR PESO//
export function orderByWeight(payload){ //value del select(weight)
    return{
        type:ORDER_BY_WEIGHT,
        payload
    }
}


//FILTER TEMPERAMENT-TRAE LOS TEMPERAMENTOS Y CARGA EL STATE.TEMPERAMENTS//
export function getTemperamentsList() {
    return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/temperaments");
      let listOfTemperaments = json.data.map((el) => el.name);     //[valiente,fuerte,] = ['valiente','egoista'].sort(egosta,valiente)
    return dispatch({
        type: GET_TEMPERAMENTS_LIST,
        payload: listOfTemperaments,
    });
    ;}
}
// FILTRO DE TEMPERAMENTOS PPIAMENTE DICHO//
export function filterDogsByTemperament(payload) { 
        return {
        type: FILTER_BY_TEMPERAMENT,
        payload
        };
}

//BUSCO DOG POR QUERY // PARA EL SEARCH BAR
export function getNameDog (name){
    return async function(dispatch){
        try {
            let json= await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: GET_NAME_DOGS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
            alert(`Error ${error.response.status} ${error.response.data}`)
        }
    }
}

// POST DOG/RAZA
export function postDog(payload){
    return async function(dispatch){
        const info = await axios.post('http://localhost:3001/dogs',payload)
        console.log(info)
        return info
    }
}
// GET DETAILS//
export function getDogDetails(id){
    return async function(dispatch){
        try {
            let json= await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: GET_DOG_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
