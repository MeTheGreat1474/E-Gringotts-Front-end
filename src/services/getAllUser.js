import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const useGetAllUsers = (currentUsername) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/Account/allAccounts');

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
    }, [currentUsername]);

    return users;
};

export const useGetSearchUsers = (contactInfo , currentUsername) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/Account/accounts/search?contactInfo=${contactInfo}`);

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
    }, [contactInfo]);

    return users;
};