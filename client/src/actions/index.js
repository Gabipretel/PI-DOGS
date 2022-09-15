import axios from "axios";
import { GET_DOGS,FILTER_CREATED,ORDER_BY_NAME,GET_TEMPERAMENTS_LIST,GET_DOGS_BY_TEMP,ORDER_BY_WEIGHT,GET_NAME_DOGS} from "./actions";

export function getDogs(){
    return async function(dispatch){
        let json= await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload:json.data
        })
    }
}
// NO FUNCIONA..ARREGLAR
// export function filterDogsbyTemperament(payload){
//     return {
//         type: FILTER_BY_TEMPERAMENT,
//         payload
//     }
// }
export function filterCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
}
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
    var json = await axios.get("http://localhost:3001/temperaments");
      var listOfTemperaments = json.data.map((el) => el.name);     //[valiente,fuerte,]
    return dispatch({
        type: GET_TEMPERAMENTS_LIST,
        payload: listOfTemperaments,
    });
    };
}
//FILTRO DE TEMPERAMENTOS PPIAMENTE DICHO// NO FUNCIONA
export function filterDogsByTemperament(payload) { //OPTION: Brave..
        return {
        type: GET_DOGS_BY_TEMP,
        payload
        };
}

//BUSCO DOG POR QUERY //
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
        }
    }
}