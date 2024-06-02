import React, { useEffect } from 'react'
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";
import AccountContent from "../Account/AccountContent";
import Cards from "../Account/Card";
import { useGetUser } from '../../services/getUser'

//hold our Account page
function Account() {
    //retrieve the current user's username
    const { username } = useParams();
    //get the user's info by its username
    const { user, getUser } = useGetUser(username);

    //to make the getUser function called on page load and changes made
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