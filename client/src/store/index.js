//PASO #1// FRONT-END
import {createStore, applyMiddleware} from 'redux' // CREAMOS EL STORE.
import {composeWithDevTools} from 'redux-devtools-extension'  //CONFIG 
import thunk from 'redux-thunk' 
import rootReducer from '../reducer' // importamos rootReducer.
export const store= createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

