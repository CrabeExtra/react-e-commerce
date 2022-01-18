import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import store from './App/store';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Login from './routes/Login';
import Register from './routes/Register';
import OrderHistory from './routes/OrderHistory';
import ProductsList from './routes/ProductsList';
import Product from './routes/Product';
import Checkout from './routes/Checkout';

const render = () => (
  
  ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <App 
                state={store.getState()}
                dispatch={store.dispatch}
              />}>
                <Route path="orderhistory" element={<OrderHistory orders={store.getState().orders} login={store.getState().login} productsList={store.getState().productsList} dispatch={store.dispatch} />} />
                <Route path="productslist" element={<ProductsList login={store.getState().login} productsList={store.getState().productsList} dispatch={store.dispatch} />} />
                <Route path="product/:productId" element={<Product productFlip={store.getState().productId} login={store.getState().login} productsList={store.getState().productsList} dispatch={store.dispatch} />}/>
            </Route>
            <Route path="login" element={<Login login={store.getState().login} productsList={store.getState().productsList} dispatch={store.dispatch} />} />
            <Route path="register" element={<Register login={store.getState().login} productsList={store.getState().productsList} dispatch={store.dispatch} />} />
            <Route path="checkout" element={<Checkout productFlip={store.getState().productId} login={store.getState().login} productsList={store.getState().productsList} dispatch={store.dispatch} cart={store.getState().cart} />} />
                
                <Route
                path="*"
                element={
                  <main style={{ padding: "1rem", fontSize: "50px", textAlign: 'center' }}>
                    <p>This domain is not routed!!!</p>
                    <Link style={{color: 'lightblue'}} to="/"><strong>Back to main</strong></Link>
                  </main>
                }
                />
          </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
render();

store.subscribe(render);