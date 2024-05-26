import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import {useGetUser} from "./getUser";

//TODO: REPAIR TRANSACTION HISTORY

export const useGetUserTransacHistory = (currentUsername) => {
    const [users, setUsers] = useState([]);
    const { user, getUser } = useGetUser(currentUsername);

    useEffect(() => {
        getUser();
    }, [getUser]);

    useEffect(() => {
        if (user) {
            const fetchUsers = async () => {
                try {
                    const response = await api.get(`/Transaction/history/${user}`);

                    if (response.status === 200) {
                        const allUsersExceptCurrent = response.data.filter(user => user.username !== currentUsername);
                        setUsers(allUsersExceptCurrent);
                    } else {
                        console.log('Oops, we haven\'t got JSON!');
                    }
                } catch (error) {
                    console.log(error);
                }
            };

            fetchUsers();
        }
    }, [user, currentUsername]);

    return users;
};