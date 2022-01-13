import React from 'react';
import './../index.css';
import { Outlet, Link } from "react-router-dom";
import { setLogin } from '../features/Login/loginSlice';

//import PlaceHolder from './../features/placeHolder/placeHolder';
//import PostList from './../features/PostList/PostList';
//import Searchbar from './../features/Searchbar/Searchbar';

/**
 * 
 * displays main page of the app as the sum of its features.
 * TODO replace searchbar and postlist with actual features
 */
const App = (props) => {
  const { state, dispatch } = props;

  const logout = () => {
    dispatch(setLogin({email: "", loggedIn: false}))
  }

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          paddingTop: "1rem",
          color: 'lightblue'
        }}
      >
        <Link style={{color: 'lightblue'}} to="/login"><strong>Login</strong></Link> |{" "}
        {state.login.loggedIn ? <p></p> : <Link style={{color: 'lightblue'}} to="/register"><strong>Register</strong></Link> |" "}
        <Link style={{color: 'lightblue'}} to="/cart"><strong>Cart</strong></Link> |{" "}
        <Link id="productsListLink" style={{color: 'lightblue'}} to="/productslist"><strong>Load Products</strong></Link>
        {state.login.loggedIn ? <div><h2>Logged in: {state.login.email}</h2> <a onClick={logout}>Click here to Logout</a></div> : <h2></h2>}
        
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
