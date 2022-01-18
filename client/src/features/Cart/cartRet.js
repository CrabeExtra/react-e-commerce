import { loadCart } from './cartSlice';

export default async function cartRet(dispatch, cart, login) {
    try{
        const requestOptions = {
            method: 'POST',
            crossDomain: true,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({user_email: login.email, add: 'getCart'})
        }
        console.log(JSON.stringify({user_email: login.email, add: 'getCart'}));

        const response = await fetch('http://localhost:5000/cart',requestOptions);

        const data = await response.json();
        console.log(data);
        
        dispatch(loadCart(data));
        
            
    } catch(e) {
        console.log(e);
    }
}