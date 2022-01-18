import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrderHistory = (props) => {
    const { login, productsList, dispatch } = props;
    const navigate = useNavigate();
    //returns unlogged-in users to login page, will be added to checkout page as well as orderhistory page.
    useEffect(() => {
        if(!login.loggedIn) {
            navigate('/login');
        }
    },[]);

    return (
        <main style={{ padding: "1rem 0" }}>
        <h2>Orders:</h2>
        </main>
    )
}


export default OrderHistory;