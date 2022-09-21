import { GET_DOGS,FILTER_BY_TEMPERAMENT,FILTER_CREATED,ORDER_BY_NAME,GET_TEMPERAMENTS_LIST,GET_DOGS_BY_TEMP, ORDER_BY_WEIGHT,GET_NAME_DOGS, GET_TEMPERAMENTS, GET_DOG_DETAIL } from "../actions/actions"
const initialState= {
    dogs :[],
    alldogs:[], // ver xq no va el = y el visual me pone el :
    temperaments:[], 
    createtemperaments:[],
    dogdetails:[]
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
        case GET_TEMPERAMENTS_LIST:
                return {
                    ...state,
                    temperaments: action.payload,
                    };

        case ORDER_BY_WEIGHT:
            const dogsOrderByWeigth = action.payload === 'weak' ? 
            state.dogs.sort(function (a, b) {
                if (a.weight_max === null) {
                    return 0;
                }
                if (a.weight_max > b.weight_max) {
                    return 1;
                }
                if (a.weight_max < b.weight_max) {
                    return -1;
                }
                return 0;
                }) :

                state.dogs.sort(function (a, b) {
                    if (a.weight_max === null) {
                        return 0;
                    }
                    if (a.weight_max< b.weight_max) {
                        return 1;
                    }
                    if (a.weight_max> b.weight_max) {
                        return -1;
                    }
                    return 0;
                })
                return{
                    ...state,
                    dogs: dogsOrderByWeigth
                }
                
        case GET_NAME_DOGS:
            return{
                ...state,
                dogs: action.payload
            }
        case "POST_DOG":
            return{
                ...state,
            }

        case GET_TEMPERAMENTS:
            return{
                ...state,
                createtemperaments: action.payload
            }   
        case GET_DOG_DETAIL:
            return{
                ...state,
                dogdetails: action.payload
            }


            // ARREGLAR NO FUNCIONA
        // case FILTER_BY_TEMPERAMENT:
        //     const allDogs = state.dogs // 
        //     const statusFiltered= action.payload === 'All' ? allDogs : allDogs.filter(dog =>dog.temperament === action.payload )
        //     return{
        //         ...state,
        //         dogs: statusFiltered
        //     }

        // case GET_DOGS_BY_TEMP: // ARREGLAR NO FUNCIONA
         
        //     const perros= state.alldogs
        //     const filterTemp= action.payload === 'all' ? perros : perros.filter(dog =>dog.temperament).includes(action.payload)
        //     console.log(filterTemp)
        //     return {
        //     ...state,
        //     temperaments: filterTemp //Brave..
        //     };
        default: 
        return {...state}
    }
}
export default rootReducer
