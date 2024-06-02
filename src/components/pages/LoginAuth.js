import React, {useEffect, useState} from 'react';
import {Input} from'../Input'
import {Button} from "../Button";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import api from "../../api/axiosConfig";
import Chatbot from "../Chatbot/Chatbot";

//login authentication where user enter their 6 digit pin
function LoginAuth() {
    //component to retrieve variable from navigation
    const location = useLocation();
    const username = location.state.username;

    const [pin, setPin] = useState("");
    const [error, setError] = useState("");

    //api for verifying our pin
    const loginAuth = async (username, pin) => {
        const response = await api.post(`/Account/verifyPin?username=${username}&pin=${pin}`);
        console.log(`Username: ${username}, Pin: ${pin}`)
        return response.data;
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await loginAuth(username, pin);
        // Navigate to dashboard if login is successful
        if (response) {
            navigate(`/${username}`);
        }
        else{
            setError("* Wrong Pin. Please re-enter Pin.");
        }
    }

    const navigate = useNavigate();

    return (
        <>
            <img className='star-png' alt='star' src='/images/star2.png'/>
            <div className='login'>
                <img className='logo' alt='hogwart' src='/images/logo.png'/>
                <p className='flavor-text'>SINCE 1447</p>
                <form className='login-form-auth'>
                    <h2>Enter Pin</h2>
                    <Input className='pin' maxlength={6} inputStyle='input--signUp' type='password' placeholder="Pin" value={pin} onChange={(e) => setPin(e.target.value)}/>
                    <Button type='submit' onClick={handleOnSubmit}>Log In</Button>
                    {error && <p className="error">{error}</p>}
                </form>
                <div className='image-box'>
                    <img className='hogwart-art' alt='hogwart' src='/images/hogwarts-vector-art5.png'/>
                </div>
                <div className='box'>
                    <p></p>
                </div>
            </div>
            <Chatbot/>

        </>
    );
}

export default LoginAuth;
