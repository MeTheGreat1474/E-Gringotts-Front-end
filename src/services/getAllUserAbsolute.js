import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const useGetAllUsersAbsolute = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/Account/allAccounts');

                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.log('Oops, we haven\'t got JSON!');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    return users;
};