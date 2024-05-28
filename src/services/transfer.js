import {useState, useCallback, useEffect} from "react";
import api from "../api/axiosConfig";
import {useNavigate} from "react-router-dom";

export const postTransfer = async (toUsername, amount, detail) => {

    try {
        console.log(`1:  To: ${toUsername}, Amount: ${amount}, detail: ${detail}`)
        const response = await api.post(`/Account/signUp?username=${toUsername}&amount=${amount}&detail=${detail}`);
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



    

    return {user, getUser};
}

//To use:-
// const { user, getUser } = useGetUser(username);
//
// useEffect(() => {
//     getUser();
// }, [getUser]);
