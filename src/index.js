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
import Cart from './routes/Cart';

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
              <Route path="orderhistory" element={<OrderHistory />} />
              <Route path="productslist" element={<ProductsList />} >
                <Route  path=":productId" element={<Product />}/>
              </Route>
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
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