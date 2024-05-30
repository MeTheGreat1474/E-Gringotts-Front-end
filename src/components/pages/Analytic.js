import React from 'react'
import Navbar from "../Navbar";
import {useParams} from "react-router-dom";
import AnalyticContent from "../Analytics/AnalyticContent";
import AnalyticFilter from "../Analytics/AnalyticFilter";

function Analytic() {
    const { username } = useParams();

    return (
        <div className="dashboard">
            <div className="left">
                <Navbar username={username}/>
            </div>
            <div className="middle">
                <AnalyticContent username={username}/>
            </div>
            <div className="right">
                <AnalyticFilter username={username}/>
            </div>
        </div>
    )
}

export default Analytic
