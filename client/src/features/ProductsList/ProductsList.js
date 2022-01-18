import React, { useEffect, useState } from 'react';
import { loadData } from './productsListSlice';
import placeHolder from './placeholder.png';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ProductsList = (props) => {
    const { login, productsList, dispatch } = props; // add more props later as required
    const [exists, setExists] = useState(<p></p>);
    const [loggedOutClick, setloggedOutClick] = useState(<p></p>);
    const location = useLocation();

    useEffect(() => {
        
        // set productsList.load to true when load products is clicked
        if(productsList) {
            fetch(`http://localhost:5000/items`)
                .then(res => res.json())
                .then(data =>  {
                    dispatch(loadData(data)); //load data to store
                    console.log(data);
                })
                .catch(e =>  {
                    setExists(<h2 style={{marginTop: 100}}>Error when fetching products list data</h2>)
                    return console.log(e)
                });
        }
    }, [location]);

    const anchorHandler = (e) => {
        setloggedOutClick(<p>You must be logged in to view the product page</p>)
    }
    

    if(!productsList) {
        return <h1 style={{marginTop: 100}}>Sorry, the products weren't able to be retrieved</h1>
    }
    //map over products list below... 
    return(
        <div id='productsList' style={{marginTop: '1%'}}>
            <div>{exists}</div>
            <div>{loggedOutClick}</div>
            <ul>
                {
                    productsList.map((product, i) => {
                        if(login.loggedIn) 
                        {
                            return(
                                <li style={{margin: "20px"}} obj={product} key={i}>
                                    <div><Link to={`/product/${(i+1)}`}><u>{product.id}: {product.name} - ${product.price}</u></Link></div>
                                    <img width={200} src={placeHolder} alt='' />
                                    
                                </li>
                                
                        )} else {
                            return(
                                <li onClick={(e) => anchorHandler(e)} style={{margin: "20px"}} obj={product} key={i}>
                                    
                                    <h2><u>{product.id}: {product.name} - ${product.price}</u></h2>
                                    <img width={200} src={placeHolder} alt='' />
                                </li>
                        )}
                    })
                }
            </ul>
        </div>
    );
}

export default ProductsList;