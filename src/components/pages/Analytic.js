import React from 'react'
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import AnalyticContent from "../Analytics/AnalyticContent";

function Analytic() {
    const { username } = useParams();

    return (
        <>
            <div className="dashboard">
                <div className="sidebar">
                    <Navbar username={username}/>
                </div>
                <div className="content">
                    <AnalyticContent username={username} />
                </div>
            </div>
        </>
    );
}

export default Analytic
