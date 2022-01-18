import React, { useEffect } from 'react';
import placeHolder from './../ProductsList/placeholder.png';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

const Product = (props) => {
    const {productId} = useParams();
    const { login, productsList } = props;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!login.loggedIn) {
            navigate('/login');
        }
    },[login.loggedIn, location]);

    const onClickHandler = async () => {
        const requestOptions = {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({user_email: login.email, item_id: productsList[productId-1].id, add: 'add'})
        }
    
        const response = await fetch('http://localhost:5000/cart',requestOptions);

        const data = await response.json();
        
        console.log(data);
    }
    //map over products list below... 
    return(
        <div id='productsList' style={{marginTop: '1%'}}>
            <h2><u>{productsList[productId-1].id}: {productsList[productId-1].name} - ${productsList[productId-1].price}</u></h2>
            <img width={200} src={placeHolder} alt='' />
            <div><button onClick={onClickHandler}>Add to cart</button></div>
            <div><Link style={{color: 'lightblue', margin: '20px'}} to="/checkout"><strong>Checkout</strong></Link></div>
            <div><Link style={{color: 'lightblue'}} to="/productslist"><strong>Continue Shopping</strong></Link></div>
        </div>
    );
}

export default Product;