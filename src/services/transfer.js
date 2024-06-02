import {useState, useCallback, useEffect} from "react";
import api from "../api/axiosConfig";
import {useNavigate} from "react-router-dom";

//component for posting data to transfer api
export const postTransfer = async (senderId, receiverId, amount, category, transactionType, remarks) => {

    try {
        const response = await api.post(`/Transaction/transactions/new?senderId=${senderId}&receiverId=${receiverId}&amount=${amount}&category=${category}&transactionType=${transactionType}&remarks=${remarks}`);
        console.log('in api ' , response.data)
        return response.data;
    } catch (error) {
        console.error('Error during transfer:', error);
        return null;
    }

}
