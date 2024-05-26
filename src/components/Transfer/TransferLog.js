import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllUsers, useGetAlphabetUsers, useGetFavouriteUsers, useGetNameUsers } from "../../services/getAllUser";

function TransferLog({ search, filterType }) {
    const navigate = useNavigate();
    const { username } = useParams();
    const [users, setUsers] = useState([]);

    //TODO: IMPLEMENT PROPER FILTER CALL FOR TRANSFER
    const allUsers = useGetAllUsers(username);
    const alphabetUsers = useGetAllUsers(username);
    const favouriteUsers = useGetAllUsers(username);
    const nameUsers = useGetAllUsers(username);

    const handleClick = (path, user) => {
        navigate(path, { state: { toUser: user } });
    };

    const fetchUsers = async () => {
        let fetchedUsers;
        switch (filterType) {
            case 'recent':
                fetchedUsers = allUsers;
                break;
            case 'alphabet':
                fetchedUsers = alphabetUsers;
                break;
            case 'favourite':
                fetchedUsers = favouriteUsers;
                break;
            case 'name':
                fetchedUsers = nameUsers;
                break;
            default:
                fetchedUsers = allUsers;
        }
        setUsers(fetchedUsers);
    }

    useEffect(() => {
        fetchUsers();
    }, [filterType, username, allUsers, alphabetUsers, favouriteUsers, nameUsers]);

    return (
        <div className="logs-wrapper">
            {users.map((item, index) => (
                <div className="logs-box" key={index}>
                    <div onClick={() => handleClick(`/${username}/transfer/confirm`, item.username)} className="log">
                        <div className="username">
                            <h3>{item.username}</h3>
                        </div>
                        <div className="phone">
                            <h4>{item.phone}</h4>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TransferLog