const initialState= {
    dogs :[], // ver xq no va el = y el visual me pone el :
}
function rootReducer (state= initialState, action){
    switch (action.type) {     //if (action.type === 'GET_DOGS') return ...state, dogs:action.payload
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload
            }
        default: 
        return {...state}
    }
}
export default rootReducer
