import axios from "axios";
import { GET_DOGS } from "./actions";

export function getDogs(){
    return async function(dispatch){
        let json= await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: GET_DOGS,
            payload:json.data
        })
    }
}

export function filterDogsbyStatus(payload){
    return {
        type: 'FILTER_BY_STATUS',
        payload
    }
}


