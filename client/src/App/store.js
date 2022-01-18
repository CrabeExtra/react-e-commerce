import { createStore, combineReducers } from 'redux';
import { sessionReducer, sessionService } from 'redux-react-session';
import { productsListReducer } from '../features/ProductsList/productsListSlice';
import { productReducer } from '../features/Product/productSlice';
import { loginReducer } from '../features/Login/loginSlice';
import { cartReducer } from '../features/Cart/cartSlice';
import { ordersReducer } from '../features/OrderHistory/orderHistorySlice';

// import other features
/**
 * generates the state store of the app to be used throughout persistently
 */
const reducers = {
    productsList: productsListReducer,
    login: loginReducer,
    productId: productReducer,
    cart: cartReducer,
    orders: ordersReducer,
    session: sessionReducer
    //other reducers
}


const store = createStore(combineReducers(reducers));
sessionService.initSessionService(store);

export default store;