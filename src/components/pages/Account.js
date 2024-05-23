import React, { useEffect } from 'react'
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import AccountContent from "../Account/AccountContent";
import Cards from "../Account/Card";
import { useGetUser } from '../../services/getUser'

function Account() {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <AccountContent user={user}/>
            </div>
            <div className="right">
                <Cards user={user}/>
            </div>
        </div>
    )
}

export default Account