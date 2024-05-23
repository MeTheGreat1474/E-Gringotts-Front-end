import React, {useEffect} from 'react'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import {useGetAllUsers} from "../../services/getAllUser";

//TODO: ADD PHONE DATA INTO FIELD
//TODO: PASS USER DATA TO TRANSFERTO.JS UPON CLICK
function TransferLog({ search, filterType }) {
    const navigate = useNavigate();
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    const handleClick = (path, username, phone) => {
        navigate(path);
        console.log(`Username: ${username}, Phone: ${phone}`);
        // You can use the username and phone here or pass them to another function
    };

    useEffect(() => {
        getUser();
    }, [getUser]);

    const allUsers = useGetAllUsers(username);

    useEffect(() => {
        console.log(allUsers);
    }, [allUsers]);

    const data = allUsers.map(user => ({
        username: user.username,
        phone: user.phone,

    }));

    // Placeholder function to simulate API call
    const getFilteredData = (data, filterType, search) => {
        // Implement your filtering logic here
        // For now, just return the data as is

        console.log(`Filter ${filterType}, Search ${search}`)
        return data;
    }

    const filteredData = getFilteredData(data, filterType, search);


    return (
        <div className="logs-wrapper">
            {filteredData.map((item, index) => (
                <div className="logs-box" key={index}>
                    <div onClick={() => handleClick(`/${username}/transfer/confirm`, item.username, item.phone)} className="log">
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
