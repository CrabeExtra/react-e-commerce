import { createStore, combineReducers } from 'redux';
import { sessionReducer, sessionService } from 'redux-react-session';
import { productsListReducer } from '../features/ProductsList/productsListSlice';
import { loginReducer } from '../features/Login/loginSlice';
// import other features
/**
 * generates the state store of the app to be used throughout persistently
 */
const reducers = {
    productsList: productsListReducer,
    login: loginReducer,
    session: sessionReducer
    //other reducers
}


const store = createStore(combineReducers(reducers));
console.log(store.getState());
sessionService.initSessionService(store);

export default store;