import React, { useEffect, useState } from 'react';
import { loadData } from './productsListSlice';


const ProductsList = (props) => {
    const { productsList, dispatch} = props; // add more props later as required
    const [exists, setExists] = useState(<p></p>);
    
    useEffect(() => {
        
        // set productsList.load to true when load products is clicked
        if(productsList) {
            fetch(`http://localhost:5000/items`)
                .then(res => res.json())
                .then(data =>  {
                    dispatch(loadData(data)); //load data to store
                })
                .catch(e =>  {
                    setExists(<h2 style={{marginTop: 100}}>Error when fetching products list data</h2>)
                    return console.log(e)
                });
        }
    }, [productsList, dispatch]);

    if(!productsList) {
        return <h1 style={{marginTop: 100}}>Sorry, the products weren't able to be retrieved</h1>
    }
    //map over products list below... <Card variant="outlined">{card}</Card>
    return(
        <div id='productsList' style={{marginTop: '1%'}}>
            <div>{exists}</div>
            <h2>ProductsList</h2>
            <ul>
                {
                    productsList.map((product, i) => {
                        return(
                            <li obj={product} key={i}>
                                <h2><u>{product.id}: {product.name} - ${product.price}</u></h2>
                                <img src='C:\Users\R9\Documents\QuestaGame\Codeacademy\react-e-commerce\react-e-commerce\client\src\features\ProductsList\placeholder.png' alt='' />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default ProductsList;