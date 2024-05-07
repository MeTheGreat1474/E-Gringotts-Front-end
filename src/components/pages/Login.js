import React, {useEffect, useState} from 'react';
import {Input} from'../Input'
import {Button} from "../Button";
import {Link, useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLock, faUser} from '@fortawesome/free-solid-svg-icons'
import api from "../../api/axiosConfig";


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const login = async (username, password) => {
        const response = await api.get(`/Account/login?username=${username}&password=${password}`);
        console.log(`Username: ${username}, Password: ${password}`)
        return response.data;
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const response = await login(username, password);
        console.log(`Response: ${response}`);
        // Navigate to dashboard if login is successful
        if (response) {
            navigate(`/${username}`);
        }
        else{
            setError("* Login failed. Please check your username and password.");
        }
    }

    const onSignUp = async (e) => {
        navigate('/signUp')
    }

    const navigate = useNavigate();

    return (
        <>
            <img className='star-png' alt='star' src='/images/star2.png'/>
            <div className='login'>
                <img className='logo' alt='hogwart' src='/images/logo.png'/>
                <p className='flavor-text'>SINCE 1447</p>
                <form className='login-form'>
                    {/*<FontAwesomeIcon className='icon' icon={faUser}/>*/}
                    {/*<Input type='text' placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}/>*/}
                    {/*<FontAwesomeIcon className='icon' icon={faLock}/>*/}
                    {/*<Input type='password' placeholder="Password" value={email}*/}
                    {/*       onChange={(e) => setEmail(e.target.value)}/>*/}
                    {/*<Button type='submit' onClick={handleOnSubmit}>Submit</Button>*/}
                    <FontAwesomeIcon className='icon' icon={faUser}/>
                    <Input type='text' placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <FontAwesomeIcon className='icon' icon={faLock}/>
                    <Input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type='submit' onClick={handleOnSubmit}>Submit</Button>
                    <Button onClick={onSignUp}>Sign Up</Button>
                    {error && <p className="error">{error}</p>}
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