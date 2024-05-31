import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import {useGetUser} from "./getUser";

export const useGetTransacHistory = (username) => {
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const [transacs, setTransacs] = useState([]);
    const userId = user?.userId
    console.log(userId)

    useEffect(() => {
        const fetchUsers = async (username) => {
            try {
                const response = await api.get(`/Transaction/history/${userId}`);

                if (response.status === 200) {
                    setTransacs(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers(username);
    }, [username]);

    return transacs;
};