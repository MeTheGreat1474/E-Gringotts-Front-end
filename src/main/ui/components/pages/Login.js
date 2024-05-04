import React, {useState} from 'react';
import {Input} from'../Input'
import {Button} from "../Button";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons'


function Login() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleOnSubmit = (e) => {
        console.log(`Name: ${name}, Email: ${email}`)
        e.preventDefault();
        navigate('/dashboard')
    }

    const onSignUp = (e) => {
        console.log(`Name: ${name}, Email: ${email}`)
        e.preventDefault();
        navigate('/signup')
    }

    return (
        <>
            <img className='star-png' alt='star' src='/images/star2.png'/>
            <div className='login'>
                <img className='logo' alt='hogwart' src='/images/logo.png'/>
                <p className='flavor-text'>SINCE 1447</p>
                <form className='login-form'>
                    <FontAwesomeIcon className='icon' icon={faUser}/>
                    <Input type='text' placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}/>
                    <FontAwesomeIcon className='icon' icon={faLock}/>
                    <Input type='password' placeholder="Password" value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                    <Button type='submit' onClick={handleOnSubmit}>Submit</Button>
                    <Button onClick={onSignUp}>Sign Up</Button>
                </form>
                <div className='image-box'>
                    <img className='hogwart-art' alt='hogwart' src='/images/hogwarts-vector-art5.png'/>
                </div>
                <div className='box'>
                    <p></p>
                </div>
            </div>

        </>
    );
}

export default Login;