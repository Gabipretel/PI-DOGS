import { GET_DOGS } from "../actions/actions"
const initialState= {
    dogs :[], // ver xq no va el = y el visual me pone el :
}
function rootReducer (state= initialState, action){
    switch (action.type) {     //if (action.type === 'GET_DOGS') return ...state, dogs:action.payload
        case GET_DOGS :
            return{
                ...state,
                dogs: action.payload
            }
        // case 'FILTER_BY_STATUS':
        //     const allDogs = state.dogs
        //     const statusFiltered= action.payload === ''
        //     return{
                
        //     }

        default: 
        return {...state}
    }
}
export default rootReducer
