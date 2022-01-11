import React, { useEffect, useState } from 'react';
import { loadData } from './productsListSlice';


const ProductsList = (props) => {
    const { productsList, dispatch } = props; // add more props later as required
    
    /*
    <main style={{ padding: "1rem 0" }}>
            <h2>ProductsList</h2>
            {{ProductsList}}
        </main>
    */
    useEffect(() => {
        
    }, [productsList]);

    if(!productsList || productsList.length === 0) {
        return <h1 style={{marginTop: 100}}>Sorry, the products weren't able to be retrieved</h1>
    }
    //map over products list below...
    return(
        <div id='productsList'>
            <h2>ProductsList</h2>
            {{productsList}} 
        </div>
    );
}

export default ProductsList;