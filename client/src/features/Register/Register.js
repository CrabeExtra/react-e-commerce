import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { setLogin } from './../Login/loginSlice';
import isEmail from 'validator/lib/isEmail';

const Register = (props) => {
    const { login, dispatch } = props;
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const setEmailField = (_email) => {
    
        if(_email === "" || !isEmail(_email))
            return;

        setEmail(_email);

        console.log(email);

        dispatch(setLogin(email));

    }
    
    const submitHandler = async (evt) => {
        evt.preventDefault();
        try{
            if(email !== "") {
                
                
                const requestOptions = {
                    method: 'POST',
                    crossDomain: true,
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify({email: email, password: password})
                }
                console.log(JSON.stringify({email: email, password: password}));
            
                const response = await fetch('http://localhost:5000/user',requestOptions);
                
                const data = await response.json();
            
                console.log(data);
                if(data.success === true) {
                    dispatch(setLogin({email:email, loggedIn: true}));
                }
            } 
        } catch (e) {
            console.log(e);   
        }
    }
    

    return (
        <div style={{justifyContent: "center", textAlign: "center"}}>
            <h1>Enter Login Details, passwords must match</h1>
            {login.loggedIn ? <h2>Logged in: {login.email}</h2> : 
            <form onSubmit={submitHandler} method="POST" >
                <div style={{padding:"10px"}} className="form-group">
                    <label htmlFor="Email">Email</label>
                    <input onChange={e => setEmailField(e.target.value)} className="form-control" id="email" name="email" />
                </div>

                <div style={{padding:"10px"}} className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password" />
                </div>

                <div style={{padding:"10px"}} className="form-group">
                    <label htmlFor="Password2">Type password again</label>
                    <input onChange={e => setPassword2(e.target.value)} type="password" className="form-control" id="password2" name="password2" />
                </div>
                {password === password2 ? <button style={{margin:"20px", padding: "5px"}} type="btnSubmit" className="btn btn-primary">Submit</button> : <p>Passwords do not match...</p> }
                
            </form> }

            {login.loggedIn ? <p></p> : <div><Link style={{color: 'lightblue'}} to="/login"><strong>Already have an account? login here</strong></Link></div>}
            <div><Link style={{color: 'lightblue'}} to="/"><strong>Back to main</strong></Link></div>
            
        </div>
    );
    
}

export default Register;