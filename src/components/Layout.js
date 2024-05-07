import React from 'react'
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";

function Layout() {
    const { username } = useParams();

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">

            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default Layout