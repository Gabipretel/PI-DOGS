import axios from "axios";
import { GET_DOGS,FILTER_BY_TEMPERAMENT,FILTER_CREATED } from "./actions";

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
        type:'FILTER_CREATED',
        payload
    }
}