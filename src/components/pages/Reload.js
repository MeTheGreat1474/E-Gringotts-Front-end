import React, {useEffect} from 'react'
import {useParams} from "react-router-dom";
import {useGetUser} from "../../services/getUser";
import Navbar from "../Navbar";
import ReloadContent from "../Reload/ReloadContent";

function Reload() {
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
                <ReloadContent username={username}/>
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default Reload
