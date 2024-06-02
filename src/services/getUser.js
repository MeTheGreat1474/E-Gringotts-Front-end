import {useState, useCallback, useEffect} from "react";
import api from "../api/axiosConfig";

//get the user's info from backend by current user's username
export const useGetUser = (username) => {
    const [user, setUser] = useState();

    const getUser = useCallback(async () => {
        try {
            //get user's info from Springboot backend api '/Account/${username}'
            const response = await api.get(`/Account/${username}`);

            if (response.status === 200) {
                const data = response.data;
                setUser(data);
            } else {
                console.log('Oops, we haven\'t got JSON!');
            }
        } catch (error) {
            console.log(error);
        }
    }, [username]);

    //return the user's info
    return { user, getUser };
}

//To use:-
// const { user, getUser } = useGetUser(username);
//
// useEffect(() => {
//     getUser();
// }, [getUser]);

//if use navigation
//const {variable} = location.state.{variable};
//if use passing
//<Pages username={username} />
//    const { username } = useParams();