import {useState, useCallback, useEffect} from "react";
import api from "../api/axiosConfig";
import {useNavigate} from "react-router-dom";

export const postTransfer = async (username) => {

    // States for registration
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState("");
    const [address, setAddress] = useState("");

    try {
        console.log(`1:  Name: ${username}, Email: ${email}, Password: ${password}, Address: ${address}, DOB: ${dob}`)
        const response = await api.post(`/Account/signUp?username=${username}&email=${email}&password=${password}&dob=${dob}&address=${address}`);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        return null;
    }

    // Handling the username change
    const handleName = (e) => {
        setUsername(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        // handle the error messages below the input form
        setUsernameValid(username !== "");
        setEmailValid(email !== "");
        setPasswordValid(password !== "");
        setDobValid(dob !== "");
        setAddressValid(address !== "");

        if (usernameValid === false || emailValid === false || passwordValid === false || addressValid === false || dobValid === false) {
            setError(true);
            console.log('error')
        } else {
            const response = await signup(username, email, password, address, dob);
            console.log(`Response: ${response}`);
            if (response) {
                navigate(`/${username}`);
            } else {
                setError("Signup failed. Please check your input.");
            }
        }
    };

    const getUser = useCallback(async () => {
        try {
            const response = await api.get(`/Account/${username}`);

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
                console.log(data);
            } else {
                console.log('Oops, we haven\'t got JSON!');
            }
        } catch (error) {
            console.log(error);
        }
    }, [username]);

    return {user, getUser};
}

//To use:-
// const { user, getUser } = useGetUser(username);
//
// useEffect(() => {
//     getUser();
// }, [getUser]);
