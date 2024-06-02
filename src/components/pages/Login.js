import React, {useEffect, useState} from 'react';
import {Input} from'../Input'
import {Button} from "../Button";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import api from "../../api/axiosConfig";
import Chatbot from "../Chatbot/Chatbot";

//login page and component for our website
function Login() {
    //navigate function for going from one page to another
    const navigate = useNavigate();

    //use useState to hold and set variables
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    //call the login api and pass required param
    const login = async (username, password) => {
        const response = await api.get(`/Account/login?username=${username}&password=${password}`);
        return response.data;
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        //call the login function
        const response = await login(username, password);

        // Navigate to '/auth' if login is successful
        // pass in a variable to the page
        if (response) {
            navigate(`/auth`, { state: { username: username } });
        }
        else{
            //else display error
            setError("* Login failed. Please check your username and password.");
        }
    }

    //navigate to '/signup' on button click
    const onSignUp = async (e) => {
        navigate('/signUp')
    }

    return (
        <>
            <img className='star-png' alt='star' src='/images/star2.png'/>
            <div className='login'>
                <img className='logo' alt='hogwart' src='/images/logo.png'/>
                <p className='flavor-text'>SINCE 1447</p>
                <form className='login-form'>
                    {/*use icon from FontAwesome*/}
                    <FontAwesomeIcon className='icon' icon={faUser}/>
                    <Input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <FontAwesomeIcon className='icon' icon={faLock}/>
                    <Input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type='submit' onClick={handleOnSubmit}>Log In</Button>
                    <Button onClick={onSignUp}>Sign Up</Button>
                    {/*error message displayed only when true*/}
                    {error && <p className="error">{error}</p>}
                </form>
                <div className='image-box'>
                    <img className='hogwart-art' alt='hogwart' src='/images/hogwarts-vector-art5.png'/>
                </div>
                <div className='box'>
                    <p></p>
                </div>
            </div>
            {/*call the chatbot component*/}
            <Chatbot/>

        </>
    );
}

export default Login;
