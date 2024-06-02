import React, {useEffect, useState} from 'react'
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import api from "../../api/axiosConfig";
import {useGetUser} from "../../services/getUser";

//page that contain layout and call the content for home page
function Home() {
    const { username } = useParams();
    const { user, getUser } = useGetUser(username);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <div className="dashboard">

            <div className="left">
                <Navbar username={username} user={user}/>
            </div>
            <div className="middle">
                <AccountBalance user={user}/>
                <TransactionHistory user={user}/>
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default Home
