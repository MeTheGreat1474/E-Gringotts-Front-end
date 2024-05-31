import { useState, useCallback, useEffect } from 'react';
import api from "../api/axiosConfig";

export const useGetTransactionReceipt = (transactionId) => {
    const [transactionReceipt, setTransactionReceipt] = useState(null);

    const getTransactionReceipt = useCallback(async () => {
        try {
            const response = await api.get(`/Transaction/${transactionId}/receipt`);
            console.log( 'in service ' ,transactionId)
            if (response.status === 200) {
                const data = response.data;
                setTransactionReceipt(data);
            } else {
                console.log('Oops, we haven\'t got JSON!');
            }
        } catch (error) {
            console.log(error);
        }
    }, [transactionId]);

    return { transactionReceipt, getTransactionReceipt };
}