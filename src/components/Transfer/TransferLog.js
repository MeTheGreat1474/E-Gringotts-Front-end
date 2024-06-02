import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import {useGetAllUsers, useGetSearchUsers} from "../../services/getAllUser";

//component for fetching list of user and displaying the list based on filter
function TransferLog({ search, filterType }) {
    const navigate = useNavigate();
    const { username } = useParams();
    const [users, setUsers] = useState([]);

    const allUsers = useGetAllUsers(username);
    const searchedUsers = useGetSearchUsers(search, username);

    const handleClick = (path, user) => {
        navigate(path, { state: { toUser: user } });
    };

    const fetchUsers = async () => {
        let fetchedUsers;
        switch (filterType) {
            case 'recent':
                fetchedUsers = allUsers;
                break;
            case 'contact':
                fetchedUsers = searchedUsers;
                break;
            case 'email':
                fetchedUsers = searchedUsers;
                break;
            case 'name':
                fetchedUsers = searchedUsers;
                break;
            default:
                fetchedUsers = allUsers;
        }
        setUsers(fetchedUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, [filterType, username, allUsers, searchedUsers]);

    return (
        <div className="logs-wrapper">
            {users.map((item, index) => (
                <div className="logs-box" key={index}>
                    {/*go to transfer confirm page and pass in the clicked user's username*/}
                    <div onClick={() => handleClick(`/${username}/transfer/confirm`, item.username)} className="log">
                        <div className="username">
                            <h3>{item.username}</h3>
                        </div>
                        <div className="phone">
                            <h4>{item.phone}</h4>
                        </div>
                        <div className="email">
                            <h4>{item.email}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TransferLog