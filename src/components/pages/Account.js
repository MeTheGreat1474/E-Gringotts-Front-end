import React, { useEffect } from 'react'
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import AccountContent from "../AccountContent";
import Cards from "../Card";
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