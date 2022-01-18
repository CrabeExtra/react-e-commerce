import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setOrders } from './orderHistorySlice';

const OrderHistory = (props) => {
    const { login, productsList, dispatch, orders } = props;
    const [test, setTest] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    //returns unlogged-in users to login page, will be added to checkout page as well as orderhistory page.
    useEffect(() => {
        if(!login.loggedIn) {
            navigate('/login');
        }
        if(!test) {
            fetchOrders();
        }
    },[location, dispatch, test]);

    const fetchOrders = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                crossDomain: true,
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({email: login.email})
            }

            const response = await fetch('http://localhost:5000/orders',requestOptions);
            const data = await response.json();
            
            setTest(data);
        }catch(e) {
            console.log(e);
        }
    }
    console.log(orders);
    console.log(test);
    
    if(!test || orders.test === 0) {
        return <p>not loaded</p>
    }

    return (
        <main style={{ padding: "1rem 0" }}>
            <div><h1>ORDER HISTORY:</h1></div>
        <ul style={{width:'5%', display: 'inline', textAlign: 'center' }}>
                {
                    test.map((product, i) => {
                        return (
                            <li style={{margin: "10px", display: 'inline-block'}} obj={product} key={i}>
                                <div>
                                    <h2 ><strong style={{color: 'lightblue'}}>{product.time}: {product.user_email} - ${product.items}</strong></h2>
                                </div>
                            </li>
                        )  
                    })
                }
            </ul>
        </main>
    )
}


export default OrderHistory;