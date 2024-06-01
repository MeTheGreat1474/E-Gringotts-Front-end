import {useState, useCallback, useEffect} from "react";
import api from "../api/axiosConfig";
import {useNavigate} from "react-router-dom";

export const postExchange = async (userId, fromCurrency, toCurrency, amount) => {

    try {
        const response = await api.post(`/Transaction/exchange?userId=${userId}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`);
        return response.data;
    } catch (error) {
        console.error('Error during transfer:', error);
        return null;
    }

}

