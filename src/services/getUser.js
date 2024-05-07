import {useState, useCallback, useEffect} from "react";
import api from "../api/axiosConfig";

export const useGetUser = (username) => {
    const [user, setUser] = useState();

    const getUser = useCallback(async () => {
        try {
            const response = await api.get(`/Account/${username}`);

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
                console.log(data);
            } else {
                console.log('Oops, we haven\'t got JSON!');
            }
        } catch (error) {
            console.log(error);
        }
    }, [username]);

    return { user, getUser };
}

//To use:-
// const { user, getUser } = useGetUser(username);
//
// useEffect(() => {
//     getUser();
// }, [getUser]);