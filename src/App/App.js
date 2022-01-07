import React from 'react';
import './../index.css';
import { Outlet, Link } from "react-router-dom";

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
        <Link style={{color: 'lightblue'}} to="/register"><strong>Register</strong></Link> |{" "}
        <Link style={{color: 'lightblue'}} to="/Cart"><strong>Cart</strong></Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
