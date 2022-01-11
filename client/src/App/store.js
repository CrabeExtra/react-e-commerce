import { createStore, combineReducers } from 'redux';
import { sessionReducer, sessionService } from 'redux-react-session';
import { productsListReducer } from '../features/ProductsList/productsListSlice';

// import other features
/**
 * generates the state store of the app to be used throughout persistently
 */
const reducers = {
    // replace these with reducers for this app.
    productsList: productsListReducer,
    //text: searchbarReducer,
    //subreddit: subredditReducer
    session: sessionReducer
    //other reducers
}
const store = createStore(combineReducers(reducers));

sessionService.initSessionService(store);

export default store;