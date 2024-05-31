import React, {useState} from 'react'
import SignUpForm from "../Signup/SignUpForm";
import {useNavigate} from "react-router-dom";
import {Button} from "../Button";
import '../../App.css'
import api from "../../api/axiosConfig";
import Chatbot from "../Chatbot/Chatbot";

function SignUp() {

    const navigate = useNavigate();

    // States for registration
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [DOB, setDOB] = useState("");
    const [address, setAddress] = useState("");

    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");
    const [fullName, setFullName] = useState("");


    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [DOBValid, setDOBValid] = useState(true);
    const [addressValid, setAddressValid] = useState(true);

    const [phoneValid, setPhoneValid] = useState(true);
    const [pinValid, setPinValid] = useState(true);
    const [fullNameValid, setFullNameValid] = useState(true);


    const [pinError, setPinError] = useState(false);

    const signup = async (username, email, password, address, DOB, phone, pin, fullName) => {
        try {
            console.log(`Name: ${username}, Email: ${email}, Password: ${password}, Address: ${address}, Phone=${phone}, Pin=${pin}, Fullname=${fullName}, DOB=${DOB}`)
            const response = await api.post(`/Account/signup?username=${username}&password=${password}&email=${email}&address=${address}&pin=${pin}&fullname=${fullName}&phone=${phone}&DOB=${DOB}`);
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

    const handleDOB = (e) => {
        setDOB(e.target.value);
        setSubmitted(false);
    };

    const handleAddress = (e) => {
        setAddress(e.target.value);
        setSubmitted(false);
    };

    const handlePhone = (e) => {
        setPhone(e.target.value);
        setSubmitted(false);
    };

    const handlePin = (e) => {
        const pinInput = e.target.value;
        if (!isNaN(pinInput)) {
            setPin(pinInput);
        }
        setSubmitted(false);
    };

    const handleFullName = (e) => {
        setFullName(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    // Handling the form submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setUsernameValid(username !== "");
        setEmailValid(email !== "");
        setPasswordValid(password !== "");
        setAddressValid(address !== "");
        setDOBValid(DOB !== "");
        setPhoneValid(phone !== "" && (phone.length === 10 || phone.length === 11) && !isNaN(phone));
        setPinValid(pin !== "" && pin.length === 6 && !isNaN(pin));
        setFullNameValid(fullName !== "");

        if (!usernameValid || !emailValid || !passwordValid || !addressValid || !DOBValid || !phoneValid || !pinValid || !fullNameValid) {
            setError(true);
            console.log('error')
        }
        else {
            const response = await signup(username, email, password, address, DOB, phone, pin, fullName);
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
                {/*<div className="logo-box">*/}
                {/*    <img className='logo' alt='hogwart' src='/images/logo.png'/>*/}
                {/*</div>*/}
                <div className="sign-up-container">
                    <form className='sign-up-form' onSubmit={handleOnSubmit}>
                        <div className="form-col-fullName">
                            <SignUpForm label='Full Name' onChange={handleFullName} className='input' value={fullName} type='text'/>
                            <div className={`error-message ${fullNameValid ? "" : "visible"}`}>* Please enter your full name</div>
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <SignUpForm label='Username' onChange={handleName} className='input' value={username}
                                            type='text'/>
                                <div className={`error-message ${usernameValid ? "" : "visible"}`}>* Please enter your
                                    name
                                </div>

                                <SignUpForm label='Email' onChange={handleEmail} className='input' value={email}
                                            type='email'/>
                                <div className={`error-message ${emailValid ? "" : "visible"}`}>* Please enter your
                                    email
                                </div>

                                <SignUpForm label='Password' onChange={handlePassword} className='input'
                                            value={password} type='password'/>
                                <div className={`error-message ${passwordValid ? "" : "visible"}`}>* Please enter your
                                    password
                                </div>

                                <SignUpForm label='Date of Birth' onChange={handleDOB} className='input' value={DOB}
                                            type='date'/>
                                <div className={`error-message ${DOBValid ? "" : "visible"}`}>* Please enter your date
                                    of birth
                                </div>
                            </div>
                            <div className="form-col">
                                <SignUpForm label='Phone' onChange={handlePhone} className='input' value={phone}
                                            type='number' maxlength='11'/>
                                <div className={`error-message ${phoneValid ? "" : "visible"}`}>* Please enter your
                                    phone number
                                </div>

                                <SignUpForm label='PIN' onChange={handlePin} className='input' value={pin}
                                            type='password' maxlength={6}/>
                                <div className={`error-message ${pinValid ? "" : "visible"}`}>* Please enter your pin
                                </div>

                                <SignUpForm label='Address' type='textarea' rows='10' cols='30' onChange={handleAddress}
                                            className={`input ${addressValid ? "" : "error"}`} value={address}/>
                                <div className={`error-message ${addressValid ? "" : "visible"}`}>* Please enter your
                                    address
                                </div>
                            </div>
                        </div>
                    </form>
                    <Button type='submit' onClick={handleOnSubmit}>Submit</Button>
                </div>
                <img className='hogwart-art' alt='hogwart' src='/images/hogwarts-vector-art5.png'/>
                <div className='box'>
                    <p></p>
                </div>

            </div>
            <Chatbot/>
        </>

    );

}

export default SignUp
