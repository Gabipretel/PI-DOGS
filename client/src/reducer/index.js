import { GET_DOGS,
    FILTER_BY_TEMPERAMENT,
    FILTER_CREATED,
    ORDER_BY_NAME,
    GET_TEMPERAMENTS_LIST, 
    ORDER_BY_WEIGHT,
    GET_NAME_DOGS,
    GET_DOG_DETAIL } from "../actions/actions"
const initialState= {
    dogs :[],
    alldogs:[], 
    temperaments:[], 
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
        case GET_DOG_DETAIL:
            return{
                ...state,
                dogdetails: action.payload
            }


       // ARREGLAR NO FUNCIONA
        case FILTER_BY_TEMPERAMENT:
            const perros= state.alldogs
            const filteredTemperament = action.payload === 'all' ? perros : perros.filter(el => {
                if (typeof (el.temperament) === 'string') return el.temperament.includes(action.payload);
                if (Array.isArray(el.temperaments)) {
                    let temps = el.temperaments.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
            ...state,
            dogs: filteredTemperament//Brave..
            };
        default: 
        return {...state}
    }
}
export default rootReducer
