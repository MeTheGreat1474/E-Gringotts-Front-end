import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import {useGetUser} from "./getUser";

export const useGetSingleTransacHistory = (username) => {
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [transac, setTransac] = useState();
    const userId = user?.userId
    console.log(userId)

    useEffect(() => {
        const fetchTransac = async (username) => {
            try {
                const response = await api.get(`/Transaction/history/${userId}`);

                if (response.status === 200) {
                    setTransac(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchTransac(username);
    }, [username]);

    return transac;
};