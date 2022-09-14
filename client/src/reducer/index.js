import { GET_DOGS,FILTER_BY_TEMPERAMENT,FILTER_CREATED,ORDER_BY_NAME } from "../actions/actions"
const initialState= {
    dogs :[],
    alldogs:[] // ver xq no va el = y el visual me pone el :
}
function rootReducer (state= initialState, action){
    switch (action.type) {     //if (action.type === 'GET_DOGS') return ...state, dogs:action.payload
        case GET_DOGS :
            return{
                ...state,
                dogs: action.payload,
                alldogs: action.payload ///[{}]
            }
        case FILTER_CREATED:
            const getDogs = state.alldogs
            const createdFilter = action.payload === 'created' ?  getDogs.filter(dog => dog.createdInDB) : getDogs.filter(dog => !dog.createdInDB)
            return{
                ...state,
                dogs: action.payload === 'all' ? getDogs: createdFilter //siempre el all
            }
        case ORDER_BY_NAME :
            const dogsOrder = action.payload === 'asc' ? 
            state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
                }) :

                state.dogs.sort(function (a, b) {
                    if (a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs: dogsOrder
                }


            
            // ARREGLAR NO FUNCIONA
        // case FILTER_BY_TEMPERAMENT:
        //     const allDogs = state.dogs
        //     const statusFiltered= action.payload === 'All' ? allDogs : allDogs.filter(dog =>dog.temperament === action.payload )
        //     return{
        //         ...state,
        //         dogs: statusFiltered
        //     }
            

        default: 
        return {...state}
    }
}
export default rootReducer
