import React from 'react'
import Navbar from "../Navbar";
import AccountBalance from "../Account/AccountBalance";
import TransactionHistory from "../Transaction/TransactionHistory";
import {useParams} from "react-router-dom";
import AnalyticContent from "../Analytics/AnalyticContent";

function Analytic() {
    const { username } = useParams();

    return (
        <>
            <div className="dashboard">
                <div className="left">
                    <Navbar username={username}/>
                </div>
                <div className="middle">
                    <AnalyticContent username={username} />
                </div>
                <div className="right">

                </div>
            </div>
        </>
    )
}

export default Analytic
