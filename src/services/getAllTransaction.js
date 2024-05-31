import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const useGetAllTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // const response = await api.get(`/Transaction/history/${userId}`);
                const response = await api.get(`/Transaction/history/${userId}`);
                if (response.status === 200) {
                    setTransactions(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTransactions();
    }, [userId]);

    return transactions;
};

export const useGetAllTransactionsAmount = (userId, min, max) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // const response = await api.get(`/Transaction/history/${userId}`);
                //TODO: LATER REPAIR TRANSACTION FILTER API
                const response = await api.get(`/Transaction/amount-range?minAmount=${min}&maxAmount=${max}&userId=${userId}`);
                if (response.status === 200) {
                    setTransactions(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTransactions();
    }, [userId]);

    return transactions;
};

export const useGetAllTransactionsCategory = (userId, category) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await api.get(`/Transaction/category?category=${category}&userId=${userId}`);
                if (response.status === 200) {
                    setTransactions(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTransactions();
    }, [userId, category]); // Add category to the dependency array

    return transactions;
};