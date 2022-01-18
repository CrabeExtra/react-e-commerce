import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import placeHolder from './../ProductsList/placeholder.png';
import cartRet from './../Cart/cartRet';

const Checkout = (props) => {
    const { login, cart, dispatch } = props;
    const [updCart, setUpdtCart] = useState(false);
    const [navi, setNavi] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    // returns unlogged-in users to login page, will be added to checkout page as well as orderhistory page.
    useEffect(() => {
        if(!login.loggedIn) {
            navigate('/login');
        }
        setUpdtCart(!updCart);
        setUpdtCart(!updCart);
        setUpdtCart(!updCart);
    }, [login.loggedIn])

    useEffect(()=> {
        if(navi === true) {
            onClickHandler();
            setNavi(false);
            navigate('/orderhistory');
        }
    },[navi])

    useEffect(() => {
        cartRet(dispatch, cart, login);
        console.log(updCart);
        console.log(navi);
    }, [updCart, location]); 

    const onClickHandler = async () => {
        try {
            let idString = cart.map(item => item.name);
            idString = idString.join(', ');
            const requestOptions = {
                method: 'POST',
                crossDomain: true,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({user_email: login.email, item_id: idString, add: 'checkout'})
            }
        
            const response = await fetch('http://localhost:5000/cart',requestOptions);
            setUpdtCart(true);
            
        }catch(e) {
            console.log(e);
        }
    }

    const removeCart = async (id) => {

        try {
            const requestOptions = {
                method: 'POST',
                crossDomain: true,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({user_email: login.email, item_id: id, add: 'remove'})
            }
        
            const response = await fetch('http://localhost:5000/cart',requestOptions);
            setUpdtCart(!updCart);
        }catch(e) {
            console.log(e);
        }
    }

    if(!cart) {
        return <p></p>;
    }

    return (
        <main style={{ padding: "1rem 0", justifyContent:'center', alignItems:'center', textAlign: 'center' }}>
            <div >
                <Link style={{color: 'lightblue'}} to="/productslist"><u><strong>Continue Shopping</strong></u></Link>
                <h2>Bank details added etc etc</h2>
                <h2>Checkout</h2>
                <div><button onClick={() => {setNavi(true);setUpdtCart(!updCart); setUpdtCart(!updCart);
                                        setUpdtCart(!updCart);}}>Submit Order</button></div>
            </div>
            <div >
            <h1><strong style={{color: 'lightblue'}}>Cart:</strong></h1>
            <ul style={{width:'5%', display: 'inline', textAlign: 'center' }}>
                {
                    cart.map((product, i) => {
                        return (
                            <li style={{margin: "10px", display: 'inline-block'}} obj={product} key={i}>
                                <div>
                                    <h2 ><strong style={{color: 'lightblue'}}>{product.id}: {product.name} - ${product.price}</strong></h2>
                                    <img style={{height:'auto', width: '50%'}} src={placeHolder} alt='' />
                                    <h2 onClick={() => {
                                        setUpdtCart(!updCart);
                                        setUpdtCart(!updCart);
                                        setUpdtCart(!updCart);
                                        return removeCart(product.id);
                                        }}><u><strong style={{color: 'lightblue'}}> Click here to remove from cart </strong></u></h2>
                                </div>
                            </li>
                        )  
                    })
                }
            </ul>
            </div>
        </main>
    )
}


export default Checkout;