import React, {useState} from 'react'
import SignUpForm from "../SignUpForm";
import {useNavigate} from "react-router-dom";
import {Button} from "../Button";
import '../../App.css'
import api from "../../api/axiosConfig";

function SignUp() {

    const navigate = useNavigate();

    // States for registration
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [dob, setDOB] = useState("");
    const [address, setAddress] = useState("");

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    // const [dobValid, setDobValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);

    const signup = async (username, email, password, address) => {
        try {
            console.log(`1:  Name: ${username}, Email: ${email}, Password: ${password}, Address: ${address}`)
            const response = await api.post(`/Account/signUp?username=${username}&email=${email}&password=${password}&address=${address}`);
            console.log(`2:  Name: ${username}, Email: ${email}, Password: ${password}, Address: ${address}`)
            return response.data;
        } catch (error) {
            console.error('Error during signup:', error);
            return null;
        }
    }

    // Handling the username change
    const handleName = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // const handleDOB = (e) => {
    //     setDOB(e.target.value);
    //     setSubmitted(false);
    // };

    const handleAddress = (e) => {
        setAddress(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // handle the error messages below the input form
        setUsernameValid(username !== "");
        setEmailValid(email !== "");
        setPasswordValid(password !== "");
        // setDobValid(dob !== "");
        setAddressValid(address !== "");

        if (usernameValid===false || emailValid===false || passwordValid===false || addressValid===false)
        {
            setError(true);
            console.log('error')
        }
        else {
            const response = await signup(username, email, password, address);
            console.log(`Response: ${response}`);
            if (response) {
                navigate(`/${username}`);
            } else {
                setError("Signup failed. Please check your input.");
            }
        }
    };

    return (
        <>
            <img className='star-png' alt='star' src='/images/star2.png'/>
            <div className="sign-up">
                <div className="logo-box">
                    <img className='logo' alt='hogwart' src='/images/logo.png'/>
                </div>
                <div className="sign-up-container">
                    <form className='sign-up-form' onSubmit={handleOnSubmit} >
                        <SignUpForm label='Username' onChange={handleName} className='input' value={username} type='text'/>
                        <div className={`error-message ${usernameValid ? "" : "visible"}`}>* Please enter your name</div>

                        <SignUpForm label='Email' onChange={handleEmail} className='input' value={email} type='email'/>
                        <div className={`error-message ${emailValid ? "" : "visible"}`}>* Please enter your email</div>

                        <SignUpForm label='Password' onChange={handlePassword} className='input' value={password} type='password'/>
                        <div className={`error-message ${passwordValid ? "" : "visible"}`}>* Please enter your password</div>

                        {/*<SignUpForm label='Date of Birth' onChange={handleDOB} className='input' value={dob} type='date'/>*/}
                        {/*<div className={`error-message ${dobValid ? "" : "visible"}`}>* Please enter your date of birth</div>*/}

                        <SignUpForm label='Address' type='textarea' rows='10' cols='30' onChange={handleAddress} className={`input ${addressValid ? "" : "error"}`} value={address}/>
                        <div className={`error-message ${addressValid ? "" : "visible"}`}>* Please enter your address</div>
                        <Button type='submit' >Submit</Button>
                        {/*<Button onClick={handleSubmit} type='submit' buttonSize='' buttonStyle=''>Sign Up</Button>*/}
                    </form>
                </div>
                    <img className='hogwart-art' alt='hogwart' src='/images/hogwarts-vector-art5.png'/>
                <div className='box'>
                    <p></p>
                </div>

            </div>
        </>

    );

}

export default SignUp
